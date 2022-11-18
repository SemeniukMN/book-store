import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, startWith, Subject } from 'rxjs';
import { BookFilters } from '../types/book-filters';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  readonly filters$ = new BehaviorSubject<BookFilters>({});
  readonly filterSubject$ = new Subject<void>();
  readonly filtersApplied$: Observable<BookFilters>;

  constructor() {
    this.filtersApplied$ = this.filterSubject$.pipe(
      startWith(this.filters$.getValue()),
      map(() => this.filters$.getValue()),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  filterChange(filters: BookFilters) {
    this.filters$.next(filters);
  }

  filter() {
    this.filterSubject$.next();
  }
}
