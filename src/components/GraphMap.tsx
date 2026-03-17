import { useState } from 'react'
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

export function GraphMap({
  nodes,
  edges,
  selectedId,
  connectedNodeIds,
  visibleNodeIds,
  controls,
  onSelect,
}: GraphMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const selectedNode = nodes.find((node) => node.id === selectedId)
  const visibleCount = nodes.filter((node) => visibleNodeIds.has(node.id)).length
  const viewBox =
    selectedNode && controls.centerSelected
      ? `${selectedNode.x - 28} ${selectedNode.y - 21} 56 42`
      : '0 0 100 60'

  return (
    <div className="graph-stage">
      <svg viewBox={viewBox} className="graph-svg" aria-label="Game industry relationship map">
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
                style={{ cursor: 'pointer' }}
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
