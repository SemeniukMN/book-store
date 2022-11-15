import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {map, Observable} from 'rxjs';
import {Book} from '../product/product-card/product-card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService) {
    this.books$ = this.bookService.find().pipe(
      map((response) => response.data.map(item => item.attributes)),
    );
  }

  ngOnInit(): void {
  }

}
