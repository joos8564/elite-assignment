import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeesApiService } from '../employees-api.service';
import { SortOption } from '../models/sort-on';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent {
  sortOptions: SortOption[] = [
    { text: 'Name', value: 'name' },
    { text: 'Office', value: 'office' },
  ];
  employees$: Observable<Employee[]> = this.api.employees$;

  constructor(private readonly api: EmployeesApiService) {
    this.api.get();
  }

  search(searchTerm: string): void {
    this.api.search(searchTerm);
  }

  sort(key: keyof Employee): void {
    this.api.sort(key);
  }
}
