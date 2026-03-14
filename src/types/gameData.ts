export type NodeKind = 'studio' | 'publisher' | 'game' | 'person'

export type NodeRecord = {
  id: string
  label: string
  kind: NodeKind
  era: string
  x: number
  y: number
  description: string
  highlights: string[]
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
