import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { getHumanReadableError } from '@helpers/helper'
import { ToastService } from '@services/toast.service'
import { catchError } from 'rxjs'
import { environment } from 'src/environments/environment'

export const APIInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService)
  const router = inject(Router)
  return next(
    req.clone({
      url: `${environment.apiUrl}${req.url}`
    })
  ).pipe(
    catchError((error) => {
      toastService.showErrorToast(getHumanReadableError(error.error))
      router.navigate([''])
      throw error
    })
  )
}
