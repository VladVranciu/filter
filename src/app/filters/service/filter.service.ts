import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Event } from '@model/model'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly httpClient = inject(HttpClient)

  getEvents() {
    return this.httpClient.get<Record<'events', Event[]>>('')
  }
}
