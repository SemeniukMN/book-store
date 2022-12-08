import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { filter, map, Observable, of, shareReplay, Subject, switchMap, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../product/product-card/product-card.component';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {

  form = new FormGroup({

    // User
    firstName: new FormControl('', {nonNullable: true, validators: Validators.required}),
    middleName: new FormControl('', {nonNullable: true}),
    lastName: new FormControl('', {nonNullable: true, validators: Validators.required}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),

    // Delivery
    region: new FormControl('', {nonNullable: true, validators: Validators.required}),
    city: new FormControl('', {nonNullable: true, validators: Validators.required}),
    address: new FormControl('', {nonNullable: true, validators: Validators.required}),
    deliveryDate: new FormControl<TuiDay |  null>(null, {validators: Validators.required}),

    // Pay method
    pay: new FormControl('', {nonNullable: true, validators: Validators.required})
  });

  minDeliveryDate = TuiDay.currentLocal().append({day: 3});

  readonly books$: Observable<Book[]>;
  readonly cost$: Observable<number>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cartService: CartService,
              private readonly bookService: BookService,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly orderService: OrderService) {
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

  ngOnInit(): void {
    this.authService.currentUser().pipe(
      take(1),
      filter((user): user is User => !!user),
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      this.form.patchValue({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    if (this.form.valid) {
      this.prepareValue().pipe(
        switchMap((data) => this.orderService.create(data)),
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.router.navigate(['/']).then();
      });
    }
  }

  private prepareValue(): Observable<Order> {
    return this.books$.pipe(
      map((books) => {
        return {
          ...this.form.getRawValue(),
          deliveryDate: this.form.value.deliveryDate!.getFormattedDay('YMD', '-'),
          products: books.map(({id, price}) => ({id, price}))
        }
      })
    );
  }
}
