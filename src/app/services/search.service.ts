import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly query$ = new BehaviorSubject<string>('');
  readonly search$ = new Subject<void>();
  readonly searchQuery$: Observable<string>;

  constructor() {
    this.searchQuery$ = this.search$.pipe(
      startWith(this.query$.getValue()),
      map(() => this.query$.getValue()),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  queryChange(query: string) {
    this.query$.next(query);
  }

  search() {
    this.search$.next();
  }

}
