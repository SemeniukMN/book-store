import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../product/product-card/product-card.component';

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

  params = new HttpParams({
    fromObject: {
      populate: 'preview'
    }
  });

  constructor(private readonly http: HttpClient) {

  }

  find() {
    return this.http.get<Response<Book>>(this.url, {params: this.params});
  }

}
