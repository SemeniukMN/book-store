import { Injectable } from '@angular/core';
import { Page } from '../types/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = '/api/orders';

  constructor(private readonly http: HttpClient) { }

  find(email: string) {
    const params = new HttpParams({
      fromObject: {
        ['filters[email][$eq]']: email
      }
    });
    return this.http.get<Page<Order>>(this.url, {params});
  }

  create(order: Order) {
    return this.http.post<any>(this.url, {data: order});
  }
}
