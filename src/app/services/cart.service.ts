import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly productIds$ = new BehaviorSubject<string[]>([]);
  readonly productSet = new Set();

  constructor() {
    const productIds = localStorage.getItem('cart_productIds');
    if (productIds) {
      this.productIds$.next(JSON.parse(productIds));
    }
    this.productIds$.subscribe((productIds) => {
      localStorage.setItem('cart_productIds', JSON.stringify(productIds));
      this.productSet.clear();
      productIds.forEach(id => this.productSet.add(id));
    });
  }

  add(id: string) {
    const productIds = this.productIds$.getValue();
    productIds.push(id);
    this.productIds$.next(productIds);
  }

  remove(id: string) {
    const productIds = this.productIds$.getValue();
    this.productIds$.next(productIds.filter(productId => productId !== id));
  }

}
