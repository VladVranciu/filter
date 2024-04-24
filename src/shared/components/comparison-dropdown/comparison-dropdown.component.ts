import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core'
import { comparison } from '@model/model'
import { DropdownBase } from 'src/shared/base/dropdown.base'


@Component({
  selector: 'app-comparison-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './comparison-dropdown.component.html',
  styleUrl: './comparison-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonDropdownComponent
  extends DropdownBase
  implements OnInit
{
  override isOpen = false
  override selectedValue = 'equals'
  selectedCategory = 'string'
  displayedList: string[] = comparison[this.selectedCategory]

  ngOnInit(): void {
    if(!this.value) {
      this.onValueChanged.emit(this.selectedValue)
    }
  }

  setCategory(category: string) {
    this.displayedList = comparison[category]
    this.selectedCategory = category
    this.cdr.detectChanges()
  }
}
