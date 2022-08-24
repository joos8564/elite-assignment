import { Component } from '@angular/core';
import { EmployeesApiService } from './employees-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor(private readonly api: EmployeesApiService) {
    this.api.get().subscribe(console.log);
  }
}
