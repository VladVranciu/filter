import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject
} from '@angular/core'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { Filter, Property } from '@model/model'
import { FilterSignalStore } from '@store/filter.store'
import { FilterItemAttributeRowComponent } from './filter-item-attribute-row/filter-item-attribute-row.component'

@Component({
  selector: 'app-filter-item-attributes',
  standalone: true,
  imports: [DropdownComponent, FilterItemAttributeRowComponent],
  templateUrl: './filter-item-attributes.component.html',
  styleUrl: './filter-item-attributes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemAttributesComponent {
  @Input() properties: Property[] = []
  @Input({ required: true }) filter: Filter | undefined
  @Input({ required: true }) index: number = 0
  readonly filterStore = inject(FilterSignalStore)

  addProperty() {
    this.filterStore.addProperty(this.index)
  }
}
