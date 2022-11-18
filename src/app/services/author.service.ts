import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../types/author';
import { Page } from '../types/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = '/api/authors';

  constructor(private readonly http: HttpClient) {

  }

  find(): Observable<Page<Author>> {
    return this.http.get<Page<Author>>(this.url);
  }

}
