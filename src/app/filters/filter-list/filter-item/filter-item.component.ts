import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { EVENTS } from '@constants/events'
import { Event, Filter, Property } from '@model/model'
import { ApplyClassOnHoverDirective } from 'src/shared/directives/apply-class-on-hover.directive'
import { FilterItemAttributesComponent } from './filter-item-attributes/filter-item-attributes.component'
import { FilterSignalStore } from '@store/filter.store'

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
export class FilterItemComponent implements OnInit {
  @Input({ required: true }) filter: Filter | undefined
  @Input({ required: true }) index: number = 0
  readonly filterStore = inject(FilterSignalStore)

  placeholder = 'Unnamed step'
  eventAttributeList: Property[] = []

  readonly EVENT_LIST = eventList

  get event() {
    return this.filterStore.filters().at(this.index)?.event
  }

  get isEmpty() {
    const properties = this.filterStore.filters().at(this.index)?.properties
    return (
      properties?.length === 1 && Object.keys(properties.at(0)!).length === 0
    )
  }

  get title() {
    return `${this.index + 1}.Step: ${this.event || this.placeholder}`
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setAttributeList()
  }

  handleEventChanged(event: string | any) {
    this.filterStore.setEvent(event, this.index)
    this.setAttributeList()
  }

  addEventAttribute() {
    this.filterStore.setPropertyAttribute(this.index, 0, '')
  }

  deleteItem() {
    this.filterStore.deleteItem(this.index)
  }

  duplicateItem() {
    this.filterStore.duplicateItem(this.index)
  }

  private setAttributeList() {
    if (this.event) {
      this.eventAttributeList = EVENTS.events.find(
        (event) => event.type === this.event
      )!.properties
    }
  }
}
