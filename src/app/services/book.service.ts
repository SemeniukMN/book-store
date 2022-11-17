import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../product/product-card/product-card.component';

interface Response<T> {
  data: ResponseItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    }
  }
}

interface ResponseItem<T> {
  id: string;
  attributes: T;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = '/api/books';

  constructor(private readonly http: HttpClient) {

  }

  find(query: string) {
    const params = new HttpParams({
      fromObject: {
        populate: 'preview',
        ['filters[name][$contains]']: query
      }
    });
    return this.http.get<Response<Book>>(this.url, {params});
  }

}
