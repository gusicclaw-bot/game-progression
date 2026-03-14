import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DetailPanel } from './components/DetailPanel'
import { GraphMap } from './components/GraphMap'
import { edges, gameDeepDive, kindLabels, nodes } from './data/gameData'
import type { GraphControls, NodeKind } from './types/gameData'

const defaultKinds = Object.keys(kindLabels) as NodeKind[]

function App() {
  const [selectedId, setSelectedId] = useState<string>('nintendo')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeKinds, setActiveKinds] = useState<NodeKind[]>(defaultKinds)
  const [controls, setControls] = useState<GraphControls>({
    dimUnrelated: true,
    centerSelected: false,
  })

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const visibleNodes = useMemo(() => {
    return nodes.filter((node) => {
      const matchesKind = activeKinds.includes(node.kind)
      const haystack = [node.label, node.description, node.highlights.join(' '), node.era]
        .join(' ')
        .toLowerCase()
      const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch)
      return matchesKind && matchesSearch
    })
  }, [activeKinds, normalizedSearch])

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes])

  useEffect(() => {
    if (!visibleNodeIds.has(selectedId) && visibleNodes.length > 0) {
      setSelectedId(visibleNodes[0].id)
    }
  }, [selectedId, visibleNodeIds, visibleNodes])

  const selectedNode = useMemo(
    () => visibleNodes.find((node) => node.id === selectedId) ?? visibleNodes[0] ?? nodes[0],
    [selectedId, visibleNodes],
  )

  const visibleEdges = useMemo(
    () =>
      edges.filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)),
    [visibleNodeIds],
  )

  const connectedEdges = visibleEdges.filter(
    (edge) => edge.from === selectedNode.id || edge.to === selectedNode.id,
  )

  const connectedNodeIds = new Set(
    connectedEdges.flatMap((edge) => [edge.from, edge.to]).filter((id) => id !== selectedNode.id),
  )

  const connectedNodes = visibleNodes.filter((node) => connectedNodeIds.has(node.id))
  const deepDive = gameDeepDive[selectedNode.id]

  const toggleKind = (kind: NodeKind) => {
    setActiveKinds((currentKinds) => {
      if (currentKinds.includes(kind)) {
        return currentKinds.length === 1 ? currentKinds : currentKinds.filter((item) => item !== kind)
      }

      return [...currentKinds, kind]
    })
  }

  const resetView = () => {
    setSearchTerm('')
    setActiveKinds(defaultKinds)
    setSelectedId('nintendo')
    setControls({ dimUnrelated: true, centerSelected: false })
  }

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
            <a
              className="action-pill primary"
              href="https://github.com/gusicclaw-bot/game-progression"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub repo
            </a>
            <span className="action-pill subtle">Exploration pass: search + filters + focus</span>
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
            <p className="muted">Search, filter, and focus the graph instead of scanning everything at once.</p>
          </div>

          <div className="control-stack">
            <label className="search-input-wrap">
              <span className="control-label">Search nodes</span>
              <input
                className="search-input"
                type="search"
                placeholder="Try Nintendo, Pokémon, Kirby, Iwata..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <div className="control-group">
              <span className="control-label">Filter by type</span>
              <div className="chip-row">
                {defaultKinds.map((kind) => {
                  const active = activeKinds.includes(kind)
                  return (
                    <button
                      key={kind}
                      type="button"
                      className={`filter-chip ${active ? 'active' : ''} ${kind}`}
                      onClick={() => toggleKind(kind)}
                    >
                      {kindLabels[kind]}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="control-group">
              <span className="control-label">Graph behavior</span>
              <div className="toggle-row">
                <label className="toggle-pill">
                  <input
                    type="checkbox"
                    checked={controls.dimUnrelated}
                    onChange={(event) =>
                      setControls((current) => ({ ...current, dimUnrelated: event.target.checked }))
                    }
                  />
                  <span>Dim unrelated nodes</span>
                </label>
                <label className="toggle-pill">
                  <input
                    type="checkbox"
                    checked={controls.centerSelected}
                    onChange={(event) =>
                      setControls((current) => ({ ...current, centerSelected: event.target.checked }))
                    }
                  />
                  <span>Center selected node</span>
                </label>
                <button type="button" className="action-pill subtle button-pill" onClick={resetView}>
                  Reset view
                </button>
              </div>
            </div>
          </div>

          <GraphMap
            nodes={nodes}
            edges={edges}
            selectedId={selectedNode.id}
            connectedNodeIds={connectedNodeIds}
            visibleNodeIds={visibleNodeIds}
            controls={controls}
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
          visibleCount={visibleNodes.length}
          totalCount={nodes.length}
          activeKinds={activeKinds}
          searchTerm={searchTerm}
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
              From here, the strongest follow-up is timeline mode plus a richer content schema for
              larger ecosystems.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
