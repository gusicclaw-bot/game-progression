import './App.css'
import { useMemo, useState } from 'react'

type NodeKind = 'studio' | 'publisher' | 'game' | 'person'

type NodeRecord = {
  id: string
  label: string
  kind: NodeKind
  era: string
  x: number
  y: number
  description: string
  highlights: string[]
}

type EdgeRecord = {
  from: string
  to: string
  label: string
}

const nodes: NodeRecord[] = [
  {
    id: 'nintendo',
    label: 'Nintendo',
    kind: 'publisher',
    era: '1889 → now',
    x: 18,
    y: 28,
    description:
      'A pilot anchor node for the MVP: a legacy publisher/platform holder connected to multiple internal and partner studios.',
    highlights: ['Platform holder', 'Publisher', 'Franchise owner'],
  },
  {
    id: 'game-freak',
    label: 'Game Freak',
    kind: 'studio',
    era: '1989 → now',
    x: 43,
    y: 18,
    description:
      'Independent studio best known for developing the core Pokémon RPG line while collaborating closely with Nintendo.',
    highlights: ['Japan', 'RPG', 'Long-term partner'],
  },
  {
    id: 'hal',
    label: 'HAL Laboratory',
    kind: 'studio',
    era: '1980 → now',
    x: 41,
    y: 44,
    description:
      'Nintendo-affiliated studio behind Kirby and a long-running contributor to beloved first-party-style games.',
    highlights: ['Kirby', 'Smash roots', 'Partner studio'],
  },
  {
    id: 'satoru-iwata',
    label: 'Satoru Iwata',
    kind: 'person',
    era: '1959 → 2015',
    x: 57,
    y: 33,
    description:
      'A key human connection node showing how people tie together studios, leadership, and game history.',
    highlights: ['Programmer', 'HAL leadership', 'Nintendo leadership'],
  },
  {
    id: 'pokemon-red-blue',
    label: 'Pokémon Red / Blue',
    kind: 'game',
    era: '1996 / 1998',
    x: 69,
    y: 16,
    description:
      'A landmark RPG release used in the pilot to demonstrate drill-down from industry node → studio → game.',
    highlights: ['Game Boy', 'Monster collecting', 'Global phenomenon'],
  },
  {
    id: 'kirby-super-star',
    label: 'Kirby Super Star',
    kind: 'game',
    era: '1996',
    x: 72,
    y: 48,
    description:
      'Used as a second example game to show how the graph can compare franchises, teams, and release eras.',
    highlights: ['SNES', 'Platformer', 'Multi-scenario structure'],
  },
]

const edges: EdgeRecord[] = [
  { from: 'nintendo', to: 'game-freak', label: 'publishes / partners with' },
  { from: 'nintendo', to: 'hal', label: 'publishes / collaborates with' },
  { from: 'game-freak', to: 'pokemon-red-blue', label: 'developed' },
  { from: 'hal', to: 'kirby-super-star', label: 'developed' },
  { from: 'satoru-iwata', to: 'hal', label: 'former president' },
  { from: 'satoru-iwata', to: 'nintendo', label: 'later president' },
]

const kindLabels: Record<NodeKind, string> = {
  studio: 'Studio',
  publisher: 'Publisher',
  game: 'Game',
  person: 'Person',
}

const gameDeepDive: Record<string, { sections: { title: string; items: string[] }[] }> = {
  'pokemon-red-blue': {
    sections: [
      {
        title: 'Story progression',
        items: [
          'Pallet Town beginning and first partner selection',
          'Gym challenge progression across Kanto',
          'Team Rocket escalation and Silph Co. conflict',
          'Elite Four climb and rival finale',
        ],
      },
      {
        title: 'Key characters',
        items: ['Player character', 'Professor Oak', 'Blue / rival', 'Giovanni'],
      },
      {
        title: 'Accolades / legacy',
        items: [
          'Defined monster-collection RPG design for decades',
          'Spawned one of the biggest multimedia franchises in the world',
        ],
      },
    ],
  },
  'kirby-super-star': {
    sections: [
      {
        title: 'Story progression',
        items: [
          'Spring Breeze retells Dream Land with onboarding-friendly pacing',
          'Dyna Blade expands the adventure format',
          'The Great Cave Offensive introduces treasure-hunting exploration',
          'Milky Way Wishes broadens powers and scale',
        ],
      },
      {
        title: 'Key characters',
        items: ['Kirby', 'King Dedede', 'Meta Knight', 'Marx'],
      },
      {
        title: 'Accolades / legacy',
        items: [
          'Strong example of modular game structure within one release',
          'Important title in Kirby’s long-term evolution',
        ],
      },
    ],
  },
}

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
            This pilot focuses on one curated ecosystem instead of trying to map the whole
            industry at once. The MVP choice is deliberate: a readable relationship graph,
            a clean detail panel, and expandable game drill-downs.
          </p>
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
                      className={`node ${node.kind} ${isSelected ? 'selected' : ''} ${
                        isConnected ? 'connected' : ''
                      }`}
                      onClick={() => setSelectedId(node.id)}
                    />
                    <text x={node.x} y={node.y + 7} className="node-label">
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="legend-row">
            {(['publisher', 'studio', 'person', 'game'] as NodeKind[]).map((kind) => (
              <span key={kind} className={`legend-pill ${kind}`}>
                {kindLabels[kind]}
              </span>
            ))}
          </div>
        </section>

        <aside className="detail-card">
          <div className="section-heading tight">
            <div>
              <p className="eyebrow">Selected node</p>
              <h2>{selectedNode.label}</h2>
            </div>
            <span className={`kind-badge ${selectedNode.kind}`}>{kindLabels[selectedNode.kind]}</span>
          </div>

          <p className="era">{selectedNode.era}</p>
          <p className="detail-copy">{selectedNode.description}</p>

          <div className="detail-block">
            <h3>Highlights</h3>
            <ul>
              {selectedNode.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <h3>Connected nodes</h3>
            <ul>
              {connectedNodes.map((node) => (
                <li key={node.id}>
                  <button className="text-button" onClick={() => setSelectedId(node.id)}>
                    {node.label}
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
