import { useMemo, useState } from 'react'
import './App.css'
import { DetailPanel } from './components/DetailPanel'
import { GraphMap } from './components/GraphMap'
import { edges, gameDeepDive, kindLabels, nodes } from './data/gameData'

function App() {
  const [selectedId, setSelectedId] = useState<string>('nintendo')

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedId) ?? nodes[0],
    [selectedId],
  )

  const connectedEdges = edges.filter(
    (edge) => edge.from === selectedId || edge.to === selectedId,
  )

  const connectedNodeIds = new Set(
    connectedEdges.flatMap((edge) => [edge.from, edge.to]).filter((id) => id !== selectedId),
  )

  const connectedNodes = nodes.filter((node) => connectedNodeIds.has(node.id))
  const deepDive = gameDeepDive[selectedNode.id]

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Game Progression · MVP Pilot</p>
          <h1>Explore game history as a living network.</h1>
          <p className="hero-copy">
            This first-pass pilot focuses on one curated ecosystem instead of trying to map the
            whole industry at once. The goal is to prove the core experience: discover through a
            readable graph, inspect context in a side panel, and drill deeper into selected games.
          </p>
          <div className="hero-actions">
            <a className="action-pill primary" href="https://github.com/gusicclaw-bot/game-progression" target="_blank" rel="noreferrer">
              View GitHub repo
            </a>
            <span className="action-pill subtle">Mac-friendly first pass</span>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <strong>Chosen MVP</strong>
            <span>Curated Nintendo-adjacent ecosystem pilot</span>
          </div>
          <div>
            <strong>Primary view</strong>
            <span>Network map with contextual side panel</span>
          </div>
          <div>
            <strong>Depth level</strong>
            <span>Metadata + editorial summaries + sample story breakdowns</span>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <section className="graph-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pilot experience</p>
              <h2>Neural-net style relationship map</h2>
            </div>
            <p className="muted">Click any node to inspect how the industry connects.</p>
          </div>

          <GraphMap
            nodes={nodes}
            edges={edges}
            selectedId={selectedId}
            connectedNodeIds={connectedNodeIds}
            onSelect={setSelectedId}
          />

          <div className="legend-row">
            {Object.entries(kindLabels).map(([kind, label]) => (
              <span key={kind} className={`legend-pill ${kind}`}>
                {label}
              </span>
            ))}
          </div>
        </section>

        <DetailPanel
          node={selectedNode}
          kindLabels={kindLabels}
          connectedNodes={connectedNodes}
          deepDive={deepDive}
          onSelect={setSelectedId}
        />
      </section>

      <section className="roadmap-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Why this MVP</p>
            <h2>Pilot decisions</h2>
          </div>
        </div>

        <div className="decision-grid">
          <article>
            <h3>Scope</h3>
            <p>
              Start with a single ecosystem and 20–50 nodes, not the full global games industry.
            </p>
          </article>
          <article>
            <h3>Interaction model</h3>
            <p>
              Use the graph for discovery and a side panel for readability. Cool visuals should not
              sabotage comprehension.
            </p>
          </article>
          <article>
            <h3>Content strategy</h3>
            <p>
              Combine factual metadata with curated summaries. Deep chapter-by-chapter story content
              should be selective, not universal.
            </p>
          </article>
          <article>
            <h3>Next build steps</h3>
            <p>
              Add search, filters, timeline mode, and a real content schema/API once the interaction
              pattern feels right.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
