import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { map, Observable, switchMap } from 'rxjs';
import { Book } from '../../../product/product-card/product-card.component';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService,
              private readonly searchService: SearchService) {
    this.books$ = this.searchService.searchQuery$.pipe(
      switchMap((query) => this.bookService.find(query))).pipe(
      map((response) => response.data.map(item => item.attributes)),
    );
  }

  ngOnInit(): void {
  }

}
