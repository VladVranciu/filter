import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  computed,
  inject
} from '@angular/core'
import { DropdownComponent } from '@components/dropdown/dropdown.component'
import { ApplyClassOnHoverDirective } from '@directives/apply-class-on-hover.directive'
import { Filter, Property } from '@model/model'
import { FilterSignalStore } from '@store/filter.store'
import { FilterItemAttributesComponent } from './filter-item-attributes/filter-item-attributes.component'

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

  eventList = computed(() =>
    this.filterStore.events().map((event) => event.type)
  )
  event = computed(() => this.filterStore.filters().at(this.index)?.event)

  isEmpty = computed(() => {
    const properties = this.filterStore.filters().at(this.index)?.properties
    return (
      properties?.length === 0 || (properties?.length === 1 && Object.keys(properties.at(0)!).length === 0)
    )
  })

  get title() {
    return `${this.index + 1}.Step: ${this.event() || this.placeholder}`
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
    if (this.event()) {
      this.eventAttributeList = this.filterStore
        .events()
        .find((event) => event.type === this.event())!.properties
    }
  }
}
