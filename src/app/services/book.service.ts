import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../product/product-card/product-card.component';
import { Page } from '../types/page';
import { BookFilters } from '../types/book-filters';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = '/api/books';

  constructor(private readonly http: HttpClient) {

  }

  find(query: string, filters: BookFilters) {
    const params = new HttpParams().appendAll({
      populate: 'preview',
      ['filters[name][$contains]']: query,
      ['filters[genre][$in]']: filters.genres || [],
      ['filters[year][$in]']: filters.years || [],
      ['filters[coverType][$in]']: filters.coverTypes || [],
      ['filters[author][id][$in]']: filters.authors?.map(({id}) => id) || []
    });
    return this.http.get<Page<Book>>(this.url, {params});
  }

}
