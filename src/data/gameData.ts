import type { DeepDiveSection, EdgeRecord, NodeKind, NodeRecord } from '../types/gameData'

export const nodes: NodeRecord[] = [
  {
    id: 'nintendo',
    label: 'Nintendo',
    kind: 'publisher',
    era: '1889 → now',
    x: 18,
    y: 28,
    description:
      'A pilot anchor node for the MVP: a legacy publisher and platform holder connected to multiple internal and partner studios.',
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
      'A landmark RPG release used in the pilot to demonstrate drill-down from industry node to studio to game.',
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

export const edges: EdgeRecord[] = [
  { from: 'nintendo', to: 'game-freak', label: 'publishes / partners with' },
  { from: 'nintendo', to: 'hal', label: 'publishes / collaborates with' },
  { from: 'game-freak', to: 'pokemon-red-blue', label: 'developed' },
  { from: 'hal', to: 'kirby-super-star', label: 'developed' },
  { from: 'satoru-iwata', to: 'hal', label: 'former president' },
  { from: 'satoru-iwata', to: 'nintendo', label: 'later president' },
]

export const kindLabels: Record<NodeKind, string> = {
  studio: 'Studio',
  publisher: 'Publisher',
  game: 'Game',
  person: 'Person',
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
