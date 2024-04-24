import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core'

@Component({
  template: ''
})
export class DropdownBase {
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>()
  isOpen = true
  selectedValue = ''
  cdr = inject(ChangeDetectorRef)

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
    this.cdr.markForCheck()
  }
}
