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
    id: 'metroid-debut',
    eraId: 'studio-foundations',
    yearLabel: '1986',
    title: 'Metroid debuts on Famicom Disk System',
    summary: 'Nintendo adds a darker sci-fi branch to its growing first-party identity, creating the foundation for one of its most influential exploration franchises.',
    relatedNodeIds: ['metroid-franchise', 'nintendo'],
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
    summary: 'Portable hardware gives Pokémon and Kirby a perfect commercial and social environment to spread.',
    relatedNodeIds: ['game-boy', 'nintendo', 'pokemon-red-blue', 'kirbys-dream-land'],
  },
  {
    id: 'kirby-debut',
    eraId: 'global-breakthrough',
    yearLabel: '1992',
    title: 'Kirby’s Dream Land introduces Kirby on Game Boy',
    summary: 'Kirby establishes itself as a Nintendo character franchise through a small, elegant handheld debut.',
    relatedNodeIds: ['kirbys-dream-land', 'kirby-franchise', 'game-boy'],
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
    id: 'pokemon-yellow',
    eraId: 'global-breakthrough',
    yearLabel: '1998',
    title: 'Pokémon Yellow broadens the franchise bridge to anime-era popularity',
    summary: 'An iteration on the original formula demonstrates how fast the Pokémon branch evolves once the brand catches fire.',
    relatedNodeIds: ['pokemon-yellow', 'pokemon-franchise', 'game-boy'],
  },
  {
    id: 'iwata-leadership',
    eraId: 'leadership-legacy',
    yearLabel: '2002',
    title: 'Satoru Iwata becomes Nintendo president',
    summary: 'A human node links technical craft, studio leadership, and executive stewardship.',
    relatedNodeIds: ['satoru-iwata', 'nintendo', 'hal'],
  },
  {
    id: 'retro-acquisition',
    eraId: 'leadership-legacy',
    yearLabel: '2002',
    title: 'Retro Studios becomes a first-party Nintendo studio',
    summary: 'The ecosystem expands beyond Japan through ownership, showing another path by which Nintendo curates its network.',
    relatedNodeIds: ['retro-studios', 'nintendo'],
  },
  {
    id: 'metroid-prime-arrives',
    eraId: 'leadership-legacy',
    yearLabel: '2002',
    title: 'Metroid Prime revives the franchise in 3D on GameCube',
    summary: 'Retro Studios helps reframe Metroid for a new platform generation, showing how Nintendo can extend a legacy franchise through a newly acquired studio.',
    relatedNodeIds: ['metroid-prime', 'retro-studios', 'gamecube', 'metroid-franchise'],
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
    y: 15,
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
    id: 'creatures',
    label: 'Creatures Inc.',
    kind: 'studio',
    era: '1995 → now',
    x: 50,
    y: 8,
    description:
      'A Pokémon-adjacent studio and production partner that helps show the franchise as a multi-company ecosystem instead of a single-studio story.',
    highlights: ['Pokémon production', 'Brand support', 'Collaborative structure'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'retro-studios',
    label: 'Retro Studios',
    kind: 'studio',
    era: '1998 → now',
    x: 30,
    y: 54,
    description:
      'A first-party Nintendo studio in North America, included here to hint at the broader global shape of the ecosystem beyond the initial Japan-centered cluster.',
    highlights: ['First-party studio', 'North America', 'Nintendo ownership'],
    timelineTags: ['leadership-legacy'],
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
    id: 'masahiro-sakurai',
    label: 'Masahiro Sakurai',
    kind: 'person',
    era: '1970 → now',
    x: 57,
    y: 50,
    description:
      'A creator node that helps explain how Kirby gained an identity early, and how individual designers give shape to a franchise branch.',
    highlights: ['Kirby creator', 'Director', 'Design leadership'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
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
    id: 'pokemon-yellow',
    label: 'Pokémon Yellow',
    kind: 'game',
    era: '1998 / 1999',
    x: 77,
    y: 6,
    description:
      'A refinement of the original Pokémon formula that reflects the franchise’s rapid consolidation into a broader cultural brand.',
    highlights: ['Anime influence', 'Pikachu focus', 'Iterative sequel'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'kirbys-dream-land',
    label: 'Kirby’s Dream Land',
    kind: 'game',
    era: '1992',
    x: 72,
    y: 56,
    description:
      'Kirby’s handheld debut is useful in the pilot because it shows how a franchise can start with a compact, elegant game and later branch outward.',
    highlights: ['Game Boy', 'Franchise debut', 'Accessible design'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'kirby-super-star',
    label: 'Kirby Super Star',
    kind: 'game',
    era: '1996',
    x: 78,
    y: 45,
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
    x: 90,
    y: 17,
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
    x: 89,
    y: 50,
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
      'Portable Nintendo hardware that provided the social and technical context for early Pokémon and Kirby’s first breakthrough.',
    highlights: ['Handheld', 'Portable link play', 'Mass-market reach'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'snes',
    label: 'Super Nintendo',
    kind: 'platform',
    era: '1990 → 2003',
    x: 61,
    y: 54,
    description:
      'A platform node that helps explain Kirby Super Star’s presentation, structure, and place in Nintendo’s 1990s output.',
    highlights: ['16-bit era', 'Nintendo home console', 'Franchise showcase'],
    timelineTags: ['global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'yoshio-sakamoto',
    label: 'Yoshio Sakamoto',
    kind: 'person',
    era: '1959 → now',
    x: 47,
    y: 64,
    description:
      'A Nintendo creative leader whose work helps connect the Metroid branch across multiple eras, making the graph feel less like isolated products and more like an authored lineage.',
    highlights: ['Nintendo R&D', 'Metroid stewardship', 'Creative continuity'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'metroid-prime',
    label: 'Metroid Prime',
    kind: 'game',
    era: '2002',
    x: 73,
    y: 66,
    description:
      'A major revival point for Metroid, useful in the pilot because it shows how Nintendo could hand a legacy franchise to Retro Studios and still preserve a coherent identity.',
    highlights: ['GameCube', 'First-person adventure', 'Franchise revival'],
    timelineTags: ['leadership-legacy'],
  },
  {
    id: 'metroid-franchise',
    label: 'Metroid',
    kind: 'franchise',
    era: '1986 → now',
    x: 88,
    y: 64,
    description:
      'A franchise node representing Nintendo’s darker exploration lineage, linking internal creative leadership with later first-party studio evolution through Retro Studios.',
    highlights: ['Sci-fi exploration', 'Atmosphere', 'Long-running Nintendo franchise'],
    timelineTags: ['studio-foundations', 'global-breakthrough', 'leadership-legacy'],
  },
  {
    id: 'gamecube',
    label: 'Nintendo GameCube',
    kind: 'platform',
    era: '2001 → 2007',
    x: 60,
    y: 67,
    description:
      'A platform node that helps explain the technical and strategic context around Metroid Prime and Nintendo’s early-2000s first-party portfolio.',
    highlights: ['Sixth generation', 'Nintendo home console', '3D-era experimentation'],
    timelineTags: ['leadership-legacy'],
  },
]

export const edges: EdgeRecord[] = [
  { from: 'nintendo', to: 'game-freak', label: 'publishes / partners with' },
  { from: 'nintendo', to: 'hal', label: 'publishes / collaborates with' },
  { from: 'nintendo', to: 'creatures', label: 'publishes / collaborates with' },
  { from: 'nintendo', to: 'retro-studios', label: 'owns first-party studio' },
  { from: 'nintendo', to: 'game-boy', label: 'platform holder' },
  { from: 'nintendo', to: 'snes', label: 'platform holder' },
  { from: 'nintendo', to: 'pokemon-franchise', label: 'brand steward / publisher' },
  { from: 'nintendo', to: 'kirby-franchise', label: 'brand steward / publisher' },
  { from: 'game-freak', to: 'pokemon-red-blue', label: 'developed' },
  { from: 'game-freak', to: 'pokemon-yellow', label: 'developed' },
  { from: 'creatures', to: 'pokemon-franchise', label: 'supports franchise ecosystem' },
  { from: 'creatures', to: 'pokemon-yellow', label: 'production partner' },
  { from: 'hal', to: 'kirbys-dream-land', label: 'developed' },
  { from: 'hal', to: 'kirby-super-star', label: 'developed' },
  { from: 'pokemon-red-blue', to: 'pokemon-franchise', label: 'belongs to franchise' },
  { from: 'pokemon-yellow', to: 'pokemon-franchise', label: 'belongs to franchise' },
  { from: 'kirbys-dream-land', to: 'kirby-franchise', label: 'belongs to franchise' },
  { from: 'kirby-super-star', to: 'kirby-franchise', label: 'belongs to franchise' },
  { from: 'pokemon-red-blue', to: 'game-boy', label: 'released on platform' },
  { from: 'pokemon-yellow', to: 'game-boy', label: 'released on platform' },
  { from: 'kirbys-dream-land', to: 'game-boy', label: 'released on platform' },
  { from: 'kirby-super-star', to: 'snes', label: 'released on platform' },
  { from: 'satoru-iwata', to: 'hal', label: 'former president' },
  { from: 'satoru-iwata', to: 'nintendo', label: 'later president' },
  { from: 'masahiro-sakurai', to: 'hal', label: 'early creative leader' },
  { from: 'masahiro-sakurai', to: 'kirby-franchise', label: 'helped define early identity' },
  { from: 'nintendo', to: 'metroid-franchise', label: 'brand steward / publisher' },
  { from: 'nintendo', to: 'gamecube', label: 'platform holder' },
  { from: 'retro-studios', to: 'metroid-prime', label: 'developed' },
  { from: 'retro-studios', to: 'metroid-franchise', label: 'helped revive in 3D era' },
  { from: 'metroid-prime', to: 'metroid-franchise', label: 'belongs to franchise' },
  { from: 'metroid-prime', to: 'gamecube', label: 'released on platform' },
  { from: 'yoshio-sakamoto', to: 'nintendo', label: 'long-term creative leader' },
  { from: 'yoshio-sakamoto', to: 'metroid-franchise', label: 'helped shape long-term identity' },
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
  'pokemon-yellow': {
    sections: [
      {
        title: 'Story progression',
        items: [
          'Revisits Kanto with Pikachu as the player’s visible starter companion',
          'Rebalances the early-game rhythm around familiarity and iteration',
          'Extends the original arc into a more brand-aware version of the same journey',
        ],
      },
      {
        title: 'Key characters',
        items: ['Pikachu', 'Jessie and James inspirations', 'Professor Oak', 'Blue / rival'],
      },
      {
        title: 'Accolades / legacy',
        items: [
          'Shows how quickly Pokémon adapted itself into a wider franchise machine',
          'Bridges the games more directly to anime-era popularity and character branding',
        ],
      },
    ],
  },
  'kirbys-dream-land': {
    sections: [
      {
        title: 'Story progression',
        items: [
          'Kirby sets out to restore Dream Land after King Dedede steals food from its citizens',
          'Compact stage structure keeps the debut readable, fast, and approachable',
          'The final confrontation establishes Kirby’s tone as playful rather than grim',
        ],
      },
      {
        title: 'Key characters',
        items: ['Kirby', 'King Dedede', 'Whispy Woods', 'Kracko'],
      },
      {
        title: 'Accolades / legacy',
        items: [
          'Introduced one of Nintendo’s most durable character franchises',
          'A strong example of how elegant handheld design can launch a long-running series',
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
  'metroid-prime': {
    sections: [
      {
        title: 'Story progression',
        items: [
          'Samus answers a distress signal and arrives over Tallon IV',
          'Pirate research and Chozo ruins turn the campaign into layered environmental investigation',
          'Artifact gathering reframes the late game around world mastery rather than simple corridor clearing',
          'The finale pits the player against Meta Ridley and the corrupted power at the planet’s core',
        ],
      },
      {
        title: 'Key characters',
        items: ['Samus Aran', 'Meta Ridley', 'Space Pirates', 'Chozo legacy'],
      },
      {
        title: 'Accolades / legacy',
        items: [
          'Widely treated as one of Nintendo’s strongest early-2000s franchise revivals',
          'Shows how Retro Studios translated Metroid into 3D without losing its atmosphere-first identity',
        ],
      },
    ],
  },
}
