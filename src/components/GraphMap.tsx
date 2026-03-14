import type { EdgeRecord, GraphControls, NodeRecord } from '../types/gameData'

type GraphMapProps = {
  nodes: NodeRecord[]
  edges: EdgeRecord[]
  selectedId: string
  connectedNodeIds: Set<string>
  visibleNodeIds: Set<string>
  controls: GraphControls
  onSelect: (id: string) => void
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
  const selectedNode = nodes.find((node) => node.id === selectedId)
  const viewBox = selectedNode && controls.centerSelected
    ? `${selectedNode.x - 24} ${selectedNode.y - 18} 48 36`
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

          const isActive = edge.from === selectedId || edge.to === selectedId
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
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 1.2}
                className={`edge-label ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
              >
                {edge.label}
              </text>
            </g>
          )
        })}

        {nodes.map((node) => {
          if (!visibleNodeIds.has(node.id)) return null

          const isSelected = node.id === selectedId
          const isConnected = connectedNodeIds.has(node.id)
          const isDimmed = controls.dimUnrelated && !isSelected && !isConnected

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 4.4 : 3.3}
                className={`node ${node.kind} ${isSelected ? 'selected' : ''} ${isConnected ? 'connected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                onClick={() => onSelect(node.id)}
              />
              <text x={node.x} y={node.y + 7} className={`node-label ${isDimmed ? 'dimmed' : ''}`}>
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
