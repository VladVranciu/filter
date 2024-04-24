import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { Property } from '@model/model'
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
  @Input() stepName: string | undefined
  selectedProperties: string[] = ['']

  add() {
    this.selectedProperties.push('')
  }
}
