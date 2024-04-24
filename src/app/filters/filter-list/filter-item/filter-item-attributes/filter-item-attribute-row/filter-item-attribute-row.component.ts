import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ComparisonDropdownComponent } from '@components/comparison-dropdown/comparison-dropdown.component'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { Property, comparison } from '@model/model'

@Component({
  selector: 'app-filter-item-attribute-row',
  standalone: true,
  imports: [DropdownComponent, ComparisonDropdownComponent, FormsModule],
  templateUrl: './filter-item-attribute-row.component.html',
  styleUrl: './filter-item-attribute-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemAttributeRowComponent {
  @Input() properties: Property[] = []
  @Input() stepName: string | undefined
  selectedAttribute = ''
  selectedComparison = ''

  value1 = null
  value2 = null
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

  handleValueChanged(event: string | any) {
    this.selectedAttribute = event
  }

  handleComparisonChanged(event: string) {
    this.selectedComparison = event
  }

  updateValue1() {
    console.log
  }
  updateValue2() {
    console.log
  }
}
