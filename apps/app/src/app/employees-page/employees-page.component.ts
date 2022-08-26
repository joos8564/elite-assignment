import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeesApiService } from '../employees-api.service';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent {
  employees$: Observable<Employee[]>;

  constructor(private readonly api: EmployeesApiService) {
    this.employees$ = this.api.get();
  }
}
