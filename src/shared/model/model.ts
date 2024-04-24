export interface Property {
  type: 'string' | 'number'
  property: string
}

export interface Event {
  type: string
  properties: Property[]
}

export interface Filter {
  event?: string
  properties?: FilterProperty[]
}

export interface FilterProperty {
  attribute?: string
  comparison?: string
  value?: string | number | [number, number] | null
}

export interface FilterState {
  filters: Filter[]
  events: Event[]
  isLoading: boolean
}

export const comparison: Record<string, string[]> = {
  string: ['equals', 'does not equal', 'contains', 'does not contain'],
  number: ['equal to', 'in between', 'less than', 'greater than']
}
