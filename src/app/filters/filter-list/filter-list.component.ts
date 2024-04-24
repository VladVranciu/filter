import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FilterItemComponent } from './filter-item/filter-item.component'
import { FilterSignalStore } from '@store/filter.store'

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [FilterItemComponent],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent {
  readonly filterStore = inject(FilterSignalStore)

  addNewFilter() {
    this.filterStore.addFilter()
  }
}
