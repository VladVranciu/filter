import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject
} from '@angular/core'

@Component({
  template: ''
})
export class DropdownBase implements OnChanges {
  @Input() value: string | undefined
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>()

  isOpen = true
  selectedValue = ''
  inputValue = ''
  cdr = inject(ChangeDetectorRef)

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['value']?.currentValue ||
      (!changes['value']?.currentValue && changes['value']?.previousValue)
    ) {
      this.selectedValue = changes['value'].currentValue
      this.isOpen = false
    }
  }

  getImageSrc() {
    return `assets/icons/chevron-${this.isOpen ? 'up' : 'down'}.svg`
  }

  handleButtonClicked() {
    this.toggleIsOpen()
  }

  selectValue(item: string) {
    this.toggleIsOpen()
    this.selectedValue = item
    this.onValueChanged.emit(item)
  }

  protected toggleIsOpen() {
    this.isOpen = !this.isOpen
    this.inputValue = ''
    this.cdr.markForCheck()
  }
}
