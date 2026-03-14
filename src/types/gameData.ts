export type NodeKind = 'studio' | 'publisher' | 'game' | 'person' | 'franchise' | 'platform'

export type NodeRecord = {
  id: string
  label: string
  kind: NodeKind
  era: string
  x: number
  y: number
  description: string
  highlights: string[]
  timelineTags: string[]
}

export type EdgeRecord = {
  from: string
  to: string
  label: string
}

export type DeepDiveSection = {
  title: string
  items: string[]
}

export type GraphControls = {
  dimUnrelated: boolean
  centerSelected: boolean
}

export type TimelineEvent = {
  id: string
  eraId: string
  yearLabel: string
  title: string
  summary: string
  relatedNodeIds: string[]
}

export type TimelineEra = {
  id: string
  label: string
  range: string
  description: string
}
