import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Book } from '../../../product/product-card/product-card.component';
import { SearchService } from '../../../services/search.service';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService,
              private readonly filterService: FilterService,
              private readonly searchService: SearchService) {
    this.books$ = combineLatest([
      this.searchService.searchQuery$,
      this.filterService.filtersApplied$
    ]).pipe(
      switchMap(([query, filters]) => this.bookService.find(query, filters))).pipe(
      map((response) => response.data.map(item => ({...item.attributes, id: item.id}))),
    );
  }

  ngOnInit(): void {
  }

}
