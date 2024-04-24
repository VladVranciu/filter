import { inject } from '@angular/core'
import { FilterService } from '@app/filters/service/filter.service'
import { FilterState } from '@model/model'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs'

export const FilterSignalStore = signalStore(
  {
    providedIn: 'root'
  },
  withState<FilterState>({
    filters: [
      {
        event: '',
        properties: [{}]
      }
    ],
    events: [],
    isLoading: false
  }),
  withMethods((store, filterService = inject(FilterService)) => ({
    addFilter: () => {
      const filters = store.filters()
      filters.push({
        event: '',
        properties: [{}]
      })
      patchState(store, { filters })
    },
    addProperty: (index: number) => {
      const filters = [...store.filters()]
      filters[index].properties?.push({})
      patchState(store, { filters })
    },
    setPropertyAttribute: (
      index: number,
      propertyIndex: number,
      attribute: string
    ) => {
      const filters = [...store.filters()]
      const properties = filters[index].properties
      if (properties) {
        properties[propertyIndex].attribute = attribute
        delete properties[propertyIndex].value
      }
      patchState(store, { filters })
    },
    setPropertyComparison: (
      index: number,
      propertyIndex: number,
      comparison: string
    ) => {
      const filters = [...store.filters()]
      const properties = filters[index].properties
      if (properties) {
        properties[propertyIndex].comparison = comparison
        delete properties[propertyIndex].value
      }
      patchState(store, { filters })
    },
    setPropertyValues: (
      index: number,
      propertyIndex: number,
      value1: string | number | null,
      value2: string | number | null
    ) => {
      const filters = [...store.filters()]
      const properties = filters[index].properties
      if (properties) {
        if (value2) {
          properties[propertyIndex].value = [value1, value2] as [number, number]
        } else {
          properties[propertyIndex].value = value1
        }
      }
      patchState(store, { filters })
    },
    setEvent: (event: string, index: number) => {
      const filters = [...store.filters()]
      filters[index].event = event
      filters[index].properties = [{}]
      patchState(store, { filters })
    },
    discardFilters: () => {
      const filters = [
        {
          event: '',
          properties: [{}]
        }
      ]
      patchState(store, { filters })
    },
    deleteItem: (index: number) => {
      const filters = [...store.filters()]
      filters.splice(index, 1)
      patchState(store, { filters })
    },
    duplicateItem: (index: number) => {
      const filters = [...store.filters()]
      const toDuplicate = structuredClone(filters.at(index)!)
      filters.splice(index, 0, toDuplicate)
      patchState(store, { filters })
    },
    loadEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          filterService.getEvents().pipe(
            tapResponse({
              next: (response) =>
                patchState(store, {
                  events: response.events,
                  isLoading: false
                }),
              error: () => {},
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        )
      )
    )
  })),
  withHooks({
    onInit: (store) => {
      store.loadEvents()
    }
  })
)
