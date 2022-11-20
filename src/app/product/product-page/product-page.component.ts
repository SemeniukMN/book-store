import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { BookService } from '../../services/book.service';
import { PageItem } from '../../types/page';
import { BookAttributes } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

  readonly book$: Observable<PageItem<BookAttributes>>;

  constructor(private readonly route: ActivatedRoute,
              private readonly bookService: BookService) {
    this.book$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) => this.bookService.findOne(id)),
      map((page) => page.data)
    );
  }

  ngOnInit(): void {
  }

}
