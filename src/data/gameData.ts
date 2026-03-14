import type {
  DeepDiveSection,
  EdgeRecord,
  NodeKind,
  NodeRecord,
  TimelineEra,
  TimelineEvent,
} from '../types/gameData'

export const timelineEras: TimelineEra[] = [
  {
    id: 'origins',
    label: 'Origins',
    range: '1889–1979',
    description: 'Nintendo’s long pre-modern history creates the anchor for the whole ecosystem.',
  },
  {
    id: 'studio-foundations',
    label: 'Studio foundations',
    range: '1980–1989',
    description: 'Key partner studios and leadership paths begin to form.',
  },
  {
    id: 'global-breakthrough',
    label: 'Global breakthrough',
    range: '1990–1999',
    description: 'Franchises and platforms start turning individual releases into world-scale phenomena.',
  },
  {
    id: 'leadership-legacy',
    label: 'Leadership legacy',
    range: '2000s+',
    description: 'The graph starts to tell a story about stewardship, continuity, and long-term platform value.',
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'nintendo-founded',
    eraId: 'origins',
    yearLabel: '1889',
    title: 'Nintendo is founded',
    summary: 'The ecosystem starts with Nintendo long before its modern video-game identity.',
    relatedNodeIds: ['nintendo'],
  },
  {
    id: 'hal-founded',
    eraId: 'studio-foundations',
    yearLabel: '1980',
    title: 'HAL Laboratory forms',
    summary: 'HAL becomes one of the important creative studios orbiting Nintendo’s world.',
    relatedNodeIds: ['hal'],
  },
  {
    id: 'gamefreak-founded',
    eraId: 'studio-foundations',
    yearLabel: '1989',
    title: 'Game Freak is established',
    summary: 'Game Freak enters the graph as a future creator of a global phenomenon.',
    relatedNodeIds: ['game-freak'],
  },
  {
    id: 'game-boy-momentum',
    eraId: 'global-breakthrough',
    yearLabel: '1990s',
    title: 'Game Boy becomes a defining handheld platform',
    summary: 'Portable hardware gives Pokémon the perfect commercial and social environment to explode.',
    relatedNodeIds: ['game-boy', 'nintendo', 'pokemon-red-blue'],
  },
  {
    id: 'pokemon-launch',
    eraId: 'global-breakthrough',
    yearLabel: '1996',
    title: 'Pokémon Red / Blue launches in Japan',
    summary: 'A single RPG release reshapes the commercial and cultural scale of the network.',
    relatedNodeIds: ['pokemon-red-blue', 'pokemon-franchise', 'game-freak'],
  },
  {
    id: 'kirby-super-star',
    eraId: 'global-breakthrough',
    yearLabel: '1996',
    title: 'Kirby Super Star expands Kirby’s identity on SNES',
    summary: 'The Kirby branch shows how franchise identity, platform context, and design experimentation reinforce each other.',
    relatedNodeIds: ['kirby-super-star', 'kirby-franchise', 'snes'],
  },
  {
    id: 'iwata-leadership',
    eraId: 'leadership-legacy',
    yearLabel: '2002',
    title: 'Satoru Iwata becomes Nintendo president',
    summary: 'A human node links technical craft, studio leadership, and executive stewardship.',
    relatedNodeIds: ['satoru-iwata', 'nintendo', 'hal'],
  },
]

export const nodes: NodeRecord[] = [
  {
    id: 'nintendo',
    label: 'Nintendo',
    kind: 'publisher',
    era: '1889 → now',
    x: 18,
    y: 30,
    description:
      'A pilot anchor node for the MVP: a legacy publisher and platform holder connected to multiple internal and partner studios, franchises, and hardware lines.',
    highlights: ['Platform holder', 'Publisher', 'Franchise owner'],
    timelineTags: ['origins', 'studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'game-freak',
    label: 'Game Freak',
    kind: 'studio',
    era: '1989 → now',
    x: 40,
    y: 16,
    description:
      'Independent studio best known for developing the core Pokémon RPG line while collaborating closely with Nintendo.',
    highlights: ['Japan', 'RPG', 'Long-term partner'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'hal',
    label: 'HAL Laboratory',
    kind: 'studio',
    era: '1980 → now',
    x: 39,
    y: 45,
    description:
      'Nintendo-affiliated studio behind Kirby and a long-running contributor to beloved first-party-style games.',
    highlights: ['Kirby', 'Smash roots', 'Partner studio'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'satoru-iwata',
    label: 'Satoru Iwata',
    kind: 'person',
    era: '1959 → 2015',
    x: 57,
    y: 31,
    description:
      'A key human connection node showing how people tie together studios, leadership, and game history.',
    highlights: ['Programmer', 'HAL leadership', 'Nintendo leadership'],
    timelineTags: ['studio-foundations', 'leadership-legacy'],
  },
  {
    id: 'pokemon-red-blue',
    label: 'Pokémon Red / Blue',
    kind: 'game',
    era: '1996 / 1998',
    x: 71,
    y: 14,
    description:
      'A landmark RPG release used in the pilot to demonstrate drill-down from industry node to studio to game to franchise and platform.',
    highlights: ['Game Boy', 'Monster collecting', 'Global phenomenon'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'kirby-super-star',
    label: 'Kirby Super Star',
    kind: 'game',
    era: '1996',
    x: 72,
    y: 46,
    description:
      'Used as a second example game to show how the graph can compare franchises, teams, release eras, and hardware context.',
    highlights: ['SNES', 'Platformer', 'Multi-scenario structure'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'pokemon-franchise',
    label: 'Pokémon',
    kind: 'franchise',
    era: '1996 → now',
    x: 86,
    y: 21,
    description:
      'A franchise node showing how one breakout game becomes an enduring brand spanning sequels, media, and long-term platform strategy.',
    highlights: ['Franchise', 'Brand expansion', 'Cross-media reach'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'kirby-franchise',
    label: 'Kirby',
    kind: 'franchise',
    era: '1992 → now',
    x: 86,
    y: 52,
    description:
      'A franchise node for tracing how HAL and Nintendo sustain a character line across multiple design eras.',
    highlights: ['Character franchise', 'Nintendo ecosystem', 'Long-running series'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'game-boy',
    label: 'Game Boy',
    kind: 'platform',
    era: '1989 → 2003',
    x: 61,
    y: 7,
    description:
      'Portable Nintendo hardware that provided the social and technical context for early Pokémon’s explosive reach.',
    highlights: ['Handheld', 'Portable link play', 'Mass-market reach'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'snes',
    label: 'Super Nintendo',
    kind: 'platform',
    era: '1990 → 2003',
    x: 60,
    y: 55,
    description:
      'A platform node that helps explain Kirby Super Star’s presentation, structure, and place in Nintendo’s 1990s output.',
    highlights: ['16-bit era', 'Nintendo home console', 'Franchise showcase'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
]

export const edges: EdgeRecord[] = [
  { from: 'nintendo', to: 'game-freak', label: 'publishes / partners with' },
  { from: 'nintendo', to: 'hal', label: 'publishes / collaborates with' },
  { from: 'nintendo', to: 'game-boy', label: 'platform holder' },
  { from: 'nintendo', to: 'snes', label: 'platform holder' },
  { from: 'nintendo', to: 'pokemon-franchise', label: 'brand steward / publisher' },
  { from: 'nintendo', to: 'kirby-franchise', label: 'brand steward / publisher' },
  { from: 'game-freak', to: 'pokemon-red-blue', label: 'developed' },
  { from: 'hal', to: 'kirby-super-star', label: 'developed' },
  { from: 'pokemon-red-blue', to: 'pokemon-franchise', label: 'belongs to franchise' },
  { from: 'kirby-super-star', to: 'kirby-franchise', label: 'belongs to franchise' },
  { from: 'pokemon-red-blue', to: 'game-boy', label: 'released on platform' },
  { from: 'kirby-super-star', to: 'snes', label: 'released on platform' },
  { from: 'satoru-iwata', to: 'hal', label: 'former president' },
  { from: 'satoru-iwata', to: 'nintendo', label: 'later president' },
]

export const kindLabels: Record<NodeKind, string> = {
  studio: 'Studio',
  publisher: 'Publisher',
  game: 'Game',
  person: 'Person',
  franchise: 'Franchise',
  platform: 'Platform',
}

export const gameDeepDive: Record<string, { sections: DeepDiveSection[] }> = {
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
