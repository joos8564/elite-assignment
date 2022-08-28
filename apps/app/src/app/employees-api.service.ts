import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { environment } from '../environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private allEmployees: Employee[] = [];
  private currentEmployees: Employee[] = [];
  private employees$$ = new Subject<Employee[]>();
  employees$ = this.employees$$.asObservable();

  constructor(private readonly http: HttpClient) {}

  get(): void {
    const url = `${environment.apiBaseUrl}/employees`;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: environment.apiKey,
    });
    this.http
      .get<Employee[]>(url, { headers })
      .pipe(takeUntil(this.destroy$))
      .subscribe((employees) => {
        this.allEmployees = employees;
        this.employees$$.next(this.allEmployees);
      });
  }

  search(searhTerm: string): void {
    const searchTermLowerCase = searhTerm.toLowerCase();
    this.currentEmployees = this.allEmployees.filter(
      (employee) =>
        employee.office?.toLowerCase().includes(searchTermLowerCase) ||
        employee.name.toLowerCase().includes(searchTermLowerCase)
    );
    this.employees$$.next(this.currentEmployees);
  }

  sort(sortOn: keyof Employee): void {
    // Sort both since allEmployees is needed for search
    this.currentEmployees = sortByKeyAsc<Employee>(
      this.currentEmployees,
      sortOn
    );
    this.allEmployees = sortByKeyAsc<Employee>(this.allEmployees, sortOn);
    // If no search has happend yet, currentEmployees will be empty
    const sortedArrayToShow =
      this.currentEmployees.length === 0
        ? this.allEmployees
        : this.currentEmployees;

    this.employees$$.next(sortedArrayToShow);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function sortByKeyAsc<T>(data: T[], key: keyof T): T[] {
  return data.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
}
