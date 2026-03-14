import type { DeepDiveSection, NodeKind, NodeRecord } from '../types/gameData'

type DetailPanelProps = {
  node: NodeRecord
  kindLabels: Record<NodeKind, string>
  connectedNodes: NodeRecord[]
  deepDive?: { sections: DeepDiveSection[] }
  onSelect: (id: string) => void
}

export function DetailPanel({ node, kindLabels, connectedNodes, deepDive, onSelect }: DetailPanelProps) {
  return (
    <aside className="detail-card">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">Selected node</p>
          <h2>{node.label}</h2>
        </div>
        <span className={`kind-badge ${node.kind}`}>{kindLabels[node.kind]}</span>
      </div>

      <p className="era">{node.era}</p>
      <p className="detail-copy">{node.description}</p>

      <div className="detail-block">
        <h3>Highlights</h3>
        <ul>
          {node.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="detail-block">
        <h3>Connected nodes</h3>
        <ul>
          {connectedNodes.map((connectedNode) => (
            <li key={connectedNode.id}>
              <button className="text-button" onClick={() => onSelect(connectedNode.id)}>
                {connectedNode.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {deepDive ? (
        <div className="detail-block">
          <h3>Game drill-down sample</h3>
          {deepDive.sections.map((section) => (
            <div key={section.title} className="deep-dive-section">
              <h4>{section.title}</h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  )
}
