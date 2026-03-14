import type { EdgeRecord, NodeRecord } from '../types/gameData'

type GraphMapProps = {
  nodes: NodeRecord[]
  edges: EdgeRecord[]
  selectedId: string
  connectedNodeIds: Set<string>
  onSelect: (id: string) => void
}

export function GraphMap({ nodes, edges, selectedId, connectedNodeIds, onSelect }: GraphMapProps) {
  return (
    <div className="graph-stage">
      <svg viewBox="0 0 100 60" className="graph-svg" aria-label="Game industry relationship map">
        {edges.map((edge) => {
          const from = nodes.find((node) => node.id === edge.from)
          const to = nodes.find((node) => node.id === edge.to)
          if (!from || !to) return null

          const isActive = edge.from === selectedId || edge.to === selectedId

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isActive ? 'edge active' : 'edge'}
              />
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 1.2}
                className={isActive ? 'edge-label active' : 'edge-label'}
              >
                {edge.label}
              </text>
            </g>
          )
        })}

        {nodes.map((node) => {
          const isSelected = node.id === selectedId
          const isConnected = connectedNodeIds.has(node.id)

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 4.2 : 3.3}
                className={`node ${node.kind} ${isSelected ? 'selected' : ''} ${isConnected ? 'connected' : ''}`}
                onClick={() => onSelect(node.id)}
              />
              <text x={node.x} y={node.y + 7} className="node-label">
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
