import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { EVENTS } from '@constants/events'
import { Event, Filter, Property } from '@model/model'
import { ApplyClassOnHoverDirective } from 'src/shared/directives/apply-class-on-hover.directive'
import { FilterItemAttributesComponent } from './filter-item-attributes/filter-item-attributes.component'

const eventList = EVENTS.events.map((event) => event.type)

@Component({
  selector: 'app-filter-item',
  standalone: true,
  imports: [
    ApplyClassOnHoverDirective,
    DropdownComponent,
    FilterItemAttributesComponent
  ],
  templateUrl: './filter-item.component.html',
  styleUrl: './filter-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemComponent {
  @Input({ required: true }) filter: Filter | undefined
  @Input({ required: true }) index: number = 0
  placeholder = 'Unnamed step'
  stepName = ''
  eventAttribute = ''
  addEventAttributeStarted = false
  eventAttributeList: Property[] = []

  readonly EVENT_LIST = eventList

  get title() {
    return `${this.index + 1}.Step: ${this.stepName || this.placeholder}`
  }

  constructor(private cdr: ChangeDetectorRef) {}

  handleEventChanged(event: string | any) {
    this.stepName = event
    this.eventAttributeList = EVENTS.events.find(
      (event) => event.type === this.stepName
    )!.properties
  }

  addEventAttribute() {
    this.fillAddEventAttributeStarted(true)
  }

  handleEventAttributeChanged(event: string) {}

  private fillAddEventAttributeStarted(value: boolean) {
    if (value !== this.addEventAttributeStarted) {
      this.addEventAttributeStarted = value
      this.cdr.markForCheck()
    }
  }
}
