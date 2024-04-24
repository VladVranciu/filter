import { Component } from '@angular/core';
import { FilterListComponent } from './filter-list/filter-list.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FilterListComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

}
