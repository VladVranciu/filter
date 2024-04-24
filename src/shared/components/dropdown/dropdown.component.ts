import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UnsubscribeMixin } from '@mixins/unsubscribe.mixin'
import { Subject, debounceTime, takeUntil } from 'rxjs'
import { DropdownBase } from 'src/shared/base/dropdown.base'

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent
  extends UnsubscribeMixin(DropdownBase)
  implements OnInit, OnChanges
{
  @Input() placeholder: string = 'Select an event'
  @Input() list: string[] = []
  @Input() event: string | undefined
  @Input() override value: string | undefined
  debouncer$ = new Subject<void>()

  inputValue = ''
  displayedList: string[] = []

  get displayValue() {
    return this.selectedValue || this.placeholder
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['list']?.currentValue) {
      this.displayedList = this.list
    }
    super.ngOnChanges(changes)
  }

  ngOnInit(): void {
    this.debouncer$
      .pipe(debounceTime(200), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.displayedList = this.list.filter((item) =>
          item.includes(this.inputValue)
        )
        this.cdr.detectChanges()
      })
  }

  filterList() {
    this.debouncer$.next()
  }
}
