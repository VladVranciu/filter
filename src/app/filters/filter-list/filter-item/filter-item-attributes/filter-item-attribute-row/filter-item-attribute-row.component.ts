import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ComparisonDropdownComponent } from '@components/comparison-dropdown/comparison-dropdown.component'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { Filter, Property, comparison } from '@model/model'
import { FilterSignalStore } from '@store/filter.store'

@Component({
  selector: 'app-filter-item-attribute-row',
  standalone: true,
  imports: [DropdownComponent, ComparisonDropdownComponent, FormsModule],
  templateUrl: './filter-item-attribute-row.component.html',
  styleUrl: './filter-item-attribute-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemAttributeRowComponent implements OnChanges {
  @Input() properties: Property[] = []
  @Input({ required: true }) filter: Filter | undefined
  @Input({ required: true }) index: number = 0
  @Input({ required: true }) propIndex: number = 0
  readonly filterStore = inject(FilterSignalStore)

  value1 = null
  value2 = null

  get event() {
    return this.filterStore.filters().at(this.index)?.event
  }

  get selectedAttribute() {
    return this.filterStore
      .filters()
      .at(this.index)
      ?.properties?.at(this.propIndex)?.attribute
  }

  get selectedComparison() {
    return this.filterStore
      .filters()
      .at(this.index)
      ?.properties?.at(this.propIndex)?.comparison
  }

  get list() {
    return this.properties.map((property) => property.property)
  }

  get type() {
    if (comparison['string'].find((item) => item === this.selectedComparison)) {
      return 'text'
    }
    return 'number'
  }

  get isDualInput() {
    return this.selectedComparison === 'in between'
  }

  ngOnChanges(changes: SimpleChanges): void {
    const property =
      changes['filter'].currentValue?.properties?.[this.propIndex]
    if (property) {
      if (property.value && Array.isArray(property.value)) {
        this.value1 = property.value.at(0)
        this.value2 = property.value.at(1)
      } else {
        this.value1 = property.value
      }
    }
  }

  handleValueChanged(event: string | any) {
    this.filterStore.setPropertyAttribute(this.index, this.propIndex, event)
    this.value1 = null
    this.value2 = null
  }

  handleComparisonChanged(event: string) {
    this.filterStore.setPropertyComparison(this.index, this.propIndex, event)
    this.value1 = null
    this.value2 = null
  }

  updateValue1() {
    this.filterStore.setPropertyValues(
      this.index,
      this.propIndex,
      this.value1,
      this.value2
    )
  }
  updateValue2() {
    this.filterStore.setPropertyValues(
      this.index,
      this.propIndex,
      this.value1,
      this.value2
    )
  }
}
