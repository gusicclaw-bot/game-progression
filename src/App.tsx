import { useEffect, useMemo, useState } from 'react'
import './App.css'
import gameLogo from './assets/game-progression-logo.jpg'
import { DetailPanel } from './components/DetailPanel'
import { GraphMap } from './components/GraphMap'
import { edges, gameDeepDive, kindLabels, nodes, timelineEras, timelineEvents } from './data/gameData'
import type { GraphControls, NodeKind } from './types/gameData'

const defaultKinds = Object.keys(kindLabels) as NodeKind[]

function App() {
  const [selectedId, setSelectedId] = useState<string>('nintendo')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeKinds, setActiveKinds] = useState<NodeKind[]>(defaultKinds)
  const [activeEraId, setActiveEraId] = useState<string>(timelineEras[2].id)
  const [controls, setControls] = useState<GraphControls>({
    dimUnrelated: true,
    centerSelected: false,
  })

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const activeEra = timelineEras.find((era) => era.id === activeEraId) ?? timelineEras[0]
  const activeEvents = timelineEvents.filter((event) => event.eraId === activeEra.id)

  const visibleNodes = useMemo(() => {
    return nodes.filter((node) => {
      const matchesKind = activeKinds.includes(node.kind)
      const matchesEra = node.timelineTags.includes(activeEra.id)
      const haystack = [node.label, node.description, node.highlights.join(' '), node.era]
        .join(' ')
        .toLowerCase()
      const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch)
      return matchesKind && matchesEra && matchesSearch
    })
  }, [activeKinds, activeEra.id, normalizedSearch])

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
    () => edges.filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)),
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

  const focusEvent = (nodeId: string) => {
    if (visibleNodeIds.has(nodeId)) {
      setSelectedId(nodeId)
      setControls((current) => ({ ...current, centerSelected: true }))
    }
  }

  const resetView = () => {
    setSearchTerm('')
    setActiveKinds(defaultKinds)
    setActiveEraId(timelineEras[2].id)
    setSelectedId('nintendo')
    setControls({ dimUnrelated: true, centerSelected: false })
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <img src={gameLogo} alt="Game Progression" className="hero-logo" />
        <div>
          <p className="eyebrow">Game Progression · MVP Pilot</p>
          <h1>Explore game history as a living network.</h1>
          <p className="hero-copy">
            Explore Nintendo's ecosystem as a living knowledge graph. Studios, people, games,
            franchises, and platforms — connected by relationships, framed by timeline eras,
            and enriched with editorial deep dives.
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
            <span className="action-pill subtle">Expanded pilot · richer graph focus</span>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <strong>Chosen MVP</strong>
            <span>Curated Nintendo-adjacent ecosystem pilot</span>
          </div>
          <div>
            <strong>Primary view</strong>
            <span>Network map with contextual side panel and timeline lens</span>
          </div>
          <div>
            <strong>Depth level</strong>
            <span>Metadata + editorial summaries + sample story breakdowns</span>
          </div>
        </div>
      </section>

      <section className="timeline-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Timeline mode</p>
            <h2>Move through the ecosystem by era</h2>
          </div>
          <p className="muted">Select a period to change which nodes and milestones are emphasized.</p>
        </div>

        <div className="timeline-rail">
          {timelineEras.map((era) => {
            const active = era.id === activeEra.id
            return (
              <button
                key={era.id}
                type="button"
                className={`timeline-stop ${active ? 'active' : ''}`}
                onClick={() => setActiveEraId(era.id)}
              >
                <span className="timeline-stop-label">{era.label}</span>
                <span className="timeline-stop-range">{era.range}</span>
              </button>
            )
          })}
        </div>

        <div className="timeline-summary">
          <div className="mini-card era-card">
            <strong>{activeEra.label}</strong>
            <span>{activeEra.range}</span>
            <p>{activeEra.description}</p>
          </div>

          <div className="timeline-events">
            {activeEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                className="timeline-event"
                onClick={() => focusEvent(event.relatedNodeIds[0])}
              >
                <span className="timeline-event-year">{event.yearLabel}</span>
                <strong>{event.title}</strong>
                <p>{event.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <section className="graph-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pilot experience</p>
              <h2>Interactive knowledge graph</h2>
            </div>
            <p className="muted">19 nodes · 34 relationships · search, filter, focus, and timeline context.</p>
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
          activeEra={activeEra}
          activeEvents={activeEvents}
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
            <p>Start with a single ecosystem and 20–50 nodes, not the full global games industry.</p>
          </article>
          <article>
            <h3>Interaction model</h3>
            <p>Use the graph for discovery, the side panel for clarity, and the timeline for historical framing.</p>
          </article>
          <article>
            <h3>Content strategy</h3>
            <p>Blend factual metadata with curated summaries and a small set of meaningful milestones.</p>
          </article>
          <article>
            <h3>Next build steps</h3>
            <p>From here, the strongest follow-up is adding another compact cluster — like Metroid, Monolith Soft, or Intelligent Systems — without changing the architecture yet.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
