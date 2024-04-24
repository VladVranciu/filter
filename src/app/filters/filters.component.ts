import { Component, inject } from '@angular/core'
import { FilterListComponent } from './filter-list/filter-list.component'
import { FilterSignalStore } from '@store/filter.store'
import { LoaderComponent } from '@components/loader/loader.component'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FilterListComponent, LoaderComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  readonly filterStore = inject(FilterSignalStore)

  discardFilters() {
    this.filterStore.discardFilters()
  }

  applyFilters() {
    console.log(this.filterStore.filters())
  }
}
