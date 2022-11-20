import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookAttributes } from '../product/product-card/product-card.component';
import { Page, SinglePage } from '../types/page';
import { BookFilters } from '../types/book-filters';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = '/api/books';

  params = new HttpParams().appendAll({
    populate: '*'
  });

  constructor(private readonly http: HttpClient) {

  }

  find(query: string, filters: BookFilters) {
    const params = this.params.appendAll({
      ['filters[name][$contains]']: query,
      ['filters[genre][$in]']: filters.genres || [],
      ['filters[year][$in]']: filters.years || [],
      ['filters[coverType][$in]']: filters.coverTypes || [],
      ['filters[author][id][$in]']: filters.authors?.map(({id}) => id) || []
    });
    return this.http.get<Page<BookAttributes>>(this.url, {params});
  }

  findOne(id: string): Observable<SinglePage<BookAttributes>> {
    return this.http.get<SinglePage<BookAttributes>>(`${this.url}/${id}`, {params: this.params});
  }

}
