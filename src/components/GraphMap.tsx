import { useEffect, useMemo, useRef, useState, type MouseEvent, type TouchEvent, type WheelEvent } from 'react'
import type { EdgeRecord, GraphControls, NodeRecord } from '../types/gameData'

type GraphMapProps = {
  nodes: NodeRecord[]
  edges: EdgeRecord[]
  selectedId: string
  connectedNodeIds: Set<string>
  visibleNodeIds: Set<string>
  controls: GraphControls
  resetToken: number
  onSelect: (id: string) => void
}

type ViewBoxRect = {
  x: number
  y: number
  width: number
  height: number
}

type PanOffset = {
  x: number
  y: number
}

const ROOT_VIEW: ViewBoxRect = { x: 0, y: 0, width: 100, height: 60 }
const CENTERED_VIEW_SIZE = { width: 56, height: 42 }
const FOCUS_VIEW_SIZE = { width: 40, height: 30 }

function nodeRadius(node: NodeRecord, isSelected: boolean): number {
  const importance = node.importance ?? 5
  const base = 1.8 + importance * 0.32
  return isSelected ? base * 1.35 : base
}

function shouldShowLabel(
  node: NodeRecord,
  isSelected: boolean,
  isConnected: boolean,
  visibleCount: number,
): boolean {
  if (isSelected || isConnected) return true
  const importance = node.importance ?? 5
  if (visibleCount <= 15) return true
  if (visibleCount <= 25) return importance >= 5
  return importance >= 7
}

function clampZoom(value: number): number {
  return Math.min(4, Math.max(1, Number(value.toFixed(2))))
}

function getCenteredView(node: NodeRecord, width: number, height: number): ViewBoxRect {
  return {
    x: node.x - width / 2,
    y: node.y - height / 2,
    width,
    height,
  }
}

function getFitView(nodes: NodeRecord[]): ViewBoxRect {
  if (nodes.length === 0) return ROOT_VIEW

  const minX = Math.min(...nodes.map((node) => node.x))
  const maxX = Math.max(...nodes.map((node) => node.x))
  const minY = Math.min(...nodes.map((node) => node.y))
  const maxY = Math.max(...nodes.map((node) => node.y))

  const paddingX = 8
  const paddingY = 6

  return {
    x: minX - paddingX,
    y: minY - paddingY,
    width: Math.max(maxX - minX + paddingX * 2, 20),
    height: Math.max(maxY - minY + paddingY * 2, 16),
  }
}

export function GraphMap({
  nodes,
  edges,
  selectedId,
  connectedNodeIds,
  visibleNodeIds,
  controls,
  resetToken,
  onSelect,
}: GraphMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState<PanOffset>({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<'default' | 'fit' | 'focus'>('default')
  const [isDragging, setIsDragging] = useState(false)

  const dragStateRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const pinchStateRef = useRef<{ distance: number; zoom: number } | null>(null)

  const selectedNode = nodes.find((node) => node.id === selectedId)
  const visibleNodes = useMemo(
    () => nodes.filter((node) => visibleNodeIds.has(node.id)),
    [nodes, visibleNodeIds],
  )
  const visibleCount = visibleNodes.length

  useEffect(() => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setViewMode('default')
  }, [resetToken])

  const baseView = useMemo(() => {
    if (viewMode === 'fit') return getFitView(visibleNodes)
    if (viewMode === 'focus' && selectedNode) {
      return getCenteredView(selectedNode, FOCUS_VIEW_SIZE.width, FOCUS_VIEW_SIZE.height)
    }
    if (selectedNode && controls.centerSelected) {
      return getCenteredView(selectedNode, CENTERED_VIEW_SIZE.width, CENTERED_VIEW_SIZE.height)
    }
    return ROOT_VIEW
  }, [controls.centerSelected, selectedNode, viewMode, visibleNodes])

  const zoomWidth = baseView.width / zoomLevel
  const zoomHeight = baseView.height / zoomLevel
  const viewCenterX = baseView.x + baseView.width / 2 + panOffset.x
  const viewCenterY = baseView.y + baseView.height / 2 + panOffset.y
  const viewBox = `${viewCenterX - zoomWidth / 2} ${viewCenterY - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`

  const adjustZoom = (delta: number) => {
    setZoomLevel((current) => clampZoom(current + delta))
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setViewMode('default')
  }

  const fitVisibleNodes = () => {
    setViewMode('fit')
    setPanOffset({ x: 0, y: 0 })
    setZoomLevel(1)
  }

  const focusSelectedNode = () => {
    if (!selectedNode) return
    setViewMode('focus')
    setPanOffset({ x: 0, y: 0 })
    setZoomLevel(1)
  }

  const handleWheel = (event: WheelEvent<SVGSVGElement>) => {
    event.preventDefault()
    setViewMode('default')
    adjustZoom(event.deltaY > 0 ? -0.2 : 0.2)
  }

  const beginDrag = (clientX: number, clientY: number) => {
    dragStateRef.current = {
      x: clientX,
      y: clientY,
      panX: panOffset.x,
      panY: panOffset.y,
    }
    setIsDragging(true)
  }

  const updateDrag = (clientX: number, clientY: number, widthPx: number, heightPx: number) => {
    const dragState = dragStateRef.current
    if (!dragState || widthPx === 0 || heightPx === 0) return

    const dx = ((clientX - dragState.x) / widthPx) * zoomWidth
    const dy = ((clientY - dragState.y) / heightPx) * zoomHeight

    setPanOffset({
      x: dragState.panX - dx,
      y: dragState.panY - dy,
    })
  }

  const endDrag = () => {
    dragStateRef.current = null
    setIsDragging(false)
  }

  const handleMouseDown = (event: MouseEvent<SVGSVGElement>) => {
    if (event.button !== 0) return
    beginDrag(event.clientX, event.clientY)
  }

  const handleMouseMove = (event: MouseEvent<SVGSVGElement>) => {
    if (!dragStateRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    updateDrag(event.clientX, event.clientY, rect.width, rect.height)
  }

  const handleTouchStart = (event: TouchEvent<SVGSVGElement>) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0]
      beginDrag(touch.clientX, touch.clientY)
      pinchStateRef.current = null
      return
    }

    if (event.touches.length === 2) {
      const [firstTouch, secondTouch] = Array.from(event.touches)
      const distance = Math.hypot(
        secondTouch.clientX - firstTouch.clientX,
        secondTouch.clientY - firstTouch.clientY,
      )
      pinchStateRef.current = { distance, zoom: zoomLevel }
      dragStateRef.current = null
      setIsDragging(false)
    }
  }

  const handleTouchMove = (event: TouchEvent<SVGSVGElement>) => {
    if (event.touches.length === 1 && dragStateRef.current) {
      event.preventDefault()
      const touch = event.touches[0]
      const rect = event.currentTarget.getBoundingClientRect()
      updateDrag(touch.clientX, touch.clientY, rect.width, rect.height)
      return
    }

    if (event.touches.length === 2 && pinchStateRef.current) {
      event.preventDefault()
      const [firstTouch, secondTouch] = Array.from(event.touches)
      const distance = Math.hypot(
        secondTouch.clientX - firstTouch.clientX,
        secondTouch.clientY - firstTouch.clientY,
      )
      const zoomRatio = distance / pinchStateRef.current.distance
      setViewMode('default')
      setZoomLevel(clampZoom(pinchStateRef.current.zoom * zoomRatio))
    }
  }

  const handleTouchEnd = () => {
    if (pinchStateRef.current) {
      pinchStateRef.current = null
    }
    if (dragStateRef.current) {
      endDrag()
    }
  }

  return (
    <div className={`graph-stage ${isDragging ? 'dragging' : ''}`}>
      <div className="graph-zoom-controls" aria-label="Graph zoom controls">
        <button
          type="button"
          className="graph-zoom-button"
          onClick={() => {
            setViewMode('default')
            adjustZoom(-0.2)
          }}
          disabled={zoomLevel <= 1}
        >
          −
        </button>
        <span className="graph-zoom-readout">{Math.round(zoomLevel * 100)}%</span>
        <button
          type="button"
          className="graph-zoom-button"
          onClick={() => {
            setViewMode('default')
            adjustZoom(0.2)
          }}
          disabled={zoomLevel >= 4}
        >
          +
        </button>
        <button type="button" className="graph-zoom-button reset" onClick={resetZoom}>
          Reset zoom
        </button>
        <button type="button" className="graph-zoom-button reset" onClick={fitVisibleNodes}>
          Fit visible
        </button>
        <button
          type="button"
          className="graph-zoom-button reset"
          onClick={focusSelectedNode}
          disabled={!selectedNode}
        >
          Focus selected
        </button>
      </div>

      <svg
        viewBox={viewBox}
        className="graph-svg"
        aria-label="Game industry relationship map"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {edges.map((edge) => {
          const from = nodes.find((node) => node.id === edge.from)
          const to = nodes.find((node) => node.id === edge.to)
          if (!from || !to) return null

          const isVisible = visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)
          if (!isVisible) return null

          const isActive =
            edge.from === selectedId ||
            edge.to === selectedId ||
            edge.from === hoveredId ||
            edge.to === hoveredId
          const isDimmed = controls.dimUnrelated && !isActive

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`edge ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
              />
              {isActive ? (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 1.2}
                  className="edge-label active"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          )
        })}

        {nodes.map((node) => {
          if (!visibleNodeIds.has(node.id)) return null

          const isSelected = node.id === selectedId
          const isConnected = connectedNodeIds.has(node.id)
          const isHovered = node.id === hoveredId
          const isDimmed = controls.dimUnrelated && !isSelected && !isConnected
          const r = nodeRadius(node, isSelected)
          const showLabel = isHovered || shouldShowLabel(node, isSelected, isConnected, visibleCount)

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId((prev) => (prev === node.id ? null : prev))}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                className={`node ${node.kind} ${isSelected ? 'selected' : ''} ${isConnected ? 'connected' : ''} ${isDimmed ? 'dimmed' : ''} ${isHovered ? 'hovered' : ''}`}
                onClick={() => onSelect(node.id)}
                style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
              />
              {showLabel ? (
                <text
                  x={node.x}
                  y={node.y + r + 1.5}
                  className={`node-label ${isDimmed ? 'dimmed' : ''} ${isSelected ? 'selected' : ''}`}
                >
                  {node.label}
                </text>
              ) : null}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
