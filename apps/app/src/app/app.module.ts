import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [AppComponent, EmployeesPageComponent, EmployeeComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
