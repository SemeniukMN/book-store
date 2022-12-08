import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { User } from '../../types/user';
import { Order } from '../../types/order';
import { TuiDay } from '@taiga-ui/cdk';
import { BookService } from '../../services/book.service';

interface OrderRow extends Order {
  id: number;
  cost: number;
  items: {
    id: number;
    name: string;
    price: number;
  }[]
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  readonly orders$: Observable<OrderRow[]>;
  readonly user$: Observable<User>;

  constructor(private readonly orderService: OrderService,
              private readonly bookService: BookService,
              private readonly authService: AuthService) {
    this.user$ = this.authService.currentUser().pipe(
      filter((user): user is User => !!user),
      shareReplay({bufferSize: 1, refCount: true})
    );
    this.orders$ = this.user$.pipe(
      switchMap((user) => this.orderService.find(user.email)),
      switchMap((orderResponse) => {
        const productIds = orderResponse.data.reduce((set, order) => {
          order.attributes.products.forEach(({id}) => set.add(id));
          return set;
        }, new Set<number>());
        return this.bookService.findByIds(Array.from(productIds)).pipe(
          map((bookResponse) => {
            const productNames = bookResponse.data.reduce((map, book) =>
              map.set(book.id, book.attributes.name), new Map<number, string>()
            );
            return orderResponse.data.map(item => ({
              ...item.attributes,
              id: item.id,
              cost: item.attributes.products?.reduce((acc, product) => acc + product.price, 0) ?? 0,
              deliveryDate: TuiDay.normalizeParse(item.attributes.deliveryDate, 'YMD').getFormattedDay('DMY', '.'),
              items: item.attributes.products?.map(({id, price}) => ({id, price, name: productNames.get(id) ?? ''})) ?? []
            }));
          })
        );
      }),
    );
  }

  ngOnInit(): void {
  }

}
