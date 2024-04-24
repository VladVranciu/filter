export interface Property {
  type: 'string' | 'number'
  property: string
}

export interface Event {
  type: string
  properties: Property[]
}

export interface FilterItemBase {
  event?: string
  property?: string
}

export interface FilterItemString extends FilterItemBase {
  type?: 'string'
  value?: string
}

export interface FilterItemNumber extends FilterItemBase {
  type?: 'number'
  value?: number | [number, number]
}

export type Filter = FilterItemString | FilterItemNumber

export interface FilterState {
  filters: Filter[]
}

export const comparison: Record<string, string[]> = {
  string: ['equals', 'does not equal', 'contains', 'does not contain'],
  number: ['equal to', 'in between', 'less than', 'greater than']
}
