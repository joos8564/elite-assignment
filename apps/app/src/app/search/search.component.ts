import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  @Output() searchTerm = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  readonly searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe((search) => this.searchTerm.emit(search ?? ''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
