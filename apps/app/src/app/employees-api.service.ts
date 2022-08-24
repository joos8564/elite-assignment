import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  constructor(private readonly http: HttpClient) {}

  get() {
    const url = `${environment.apiBaseUrl}/employees`;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: environment.apiKey,
    });
    return this.http.get<Employee[]>(url, { headers });
  }
}
