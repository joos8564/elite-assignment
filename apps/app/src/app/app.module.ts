import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesPageComponent,
    EmployeeComponent,
    SearchComponent,
    SortComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
