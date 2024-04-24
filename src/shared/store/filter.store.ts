import { Filter, FilterItemBase, FilterState } from '@model/model'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

export const FilterSignalStore = signalStore(
  {
    providedIn: 'root'
  },
  withState<FilterState>({
    filters: [{}]
  }),
  withMethods((store) => ({
    addFilter: (filter: Filter = {}) => {
      const filters = store.filters()
      filters.push(filter)
      patchState(store, { filters })
    }
  }))
)
