import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from '../models/employee';
import { SortOption } from '../models/sort-on';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnDestroy {
  @Input() sortOn: SortOption[] = [];
  @Output() sortChange = new EventEmitter<keyof Employee>();
  private destroy$ = new Subject<void>();

  readonly sortForm = new FormGroup({
    sort: new FormControl(''),
  });

  constructor() {
    this.sortForm
      .get('sort')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((sort) => {
        if (sort) {
          this.emitSortKey(sort);
        }
      });
  }

  private emitSortKey(sort: string) {
    const sortOption = this.sortOn.find((s) => s.value.toString() === sort);
    if (sortOption !== undefined) {
      const sortKey = sortOption.value;
      this.sortChange.emit(sortKey);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
