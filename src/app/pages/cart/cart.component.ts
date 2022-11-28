import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Book } from '../../product/product-card/product-card.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  readonly books$: Observable<Book[]>;
  readonly cost$: Observable<number>;

  constructor(private readonly cartService: CartService,
              private readonly bookService: BookService) {
    this.books$ = this.cartService.productIds$.pipe(
      switchMap((productIds) => productIds.length ? this.bookService.findByIds(productIds).pipe(
        map((response) => response.data.map(item => ({...item.attributes, id: item.id})))
      ) : of([])),
      shareReplay({bufferSize: 1, refCount: true})
    );
    this.cost$ = this.books$.pipe(
      map(books => books.reduce((acc, book) => acc + book.price, 0))
    );
  }

  remove(id: string) {
    this.cartService.remove(id);
  }
}
