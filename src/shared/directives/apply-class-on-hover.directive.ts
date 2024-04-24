import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appApplyClassOnHover]',
  standalone: true
})
export class ApplyClassOnHoverDirective {
  @Input('appApplyClassOnHover') hoverClass: string = ''

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.add(this.hoverClass)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove(this.hoverClass)
  }
}
