import { OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

export type MixinConstructor<T> = new (...args: any[]) => T

export interface anyObj {
  [key: string]: any
}

export const UnsubscribeMixin = <T extends MixinConstructor<anyObj>>(
  superclass: T
) => {
  return class extends superclass implements OnDestroy {
    onDestroy$: Subject<void> = new Subject<void>()

    ngOnDestroy(): void {
      this.onDestroy$.next()
      this.onDestroy$.complete()
    }
  }
}
