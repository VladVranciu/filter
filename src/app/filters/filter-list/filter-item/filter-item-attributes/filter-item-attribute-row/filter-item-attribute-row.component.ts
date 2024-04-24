import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  computed,
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

  propertyList: string[] = []
  value1 = null
  value2 = null

  event = computed(() => this.filterStore.filters().at(this.index)?.event)
  selectedAttribute = computed(
    () =>
      this.filterStore.filters().at(this.index)?.properties?.at(this.propIndex)
        ?.attribute
  )
  selectedComparison = computed(
    () =>
      this.filterStore.filters().at(this.index)?.properties?.at(this.propIndex)
        ?.comparison
  )

  isDualInput = computed(() => this.selectedComparison() === 'in between')

  type = computed(() => {
    if (
      comparison['string'].find((item) => item === this.selectedComparison())
    ) {
      return 'text'
    }
    return 'number'
  })

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
    if (changes['properties']?.currentValue) {
      this.propertyList = this.properties.map((property) => property.property)
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
