import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User, UserDTO } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  login(data: {identifier: string; password: string}) {
    return this.http.post<any>('/api/auth/local', {
      identifier: data.identifier,
      password: data.password
    });
  }

  logout() {
    localStorage.removeItem('token');
    location.replace('/login');
  }

  registration(user: UserDTO): Observable<{jwt: string, user: User}> {
    return this.http.post<{jwt: string, user: User}>('/api/auth/local/register', user);
  }

  currentUser(): Observable<User | null> {
    return this.http.get<User>('/api/users/me').pipe(
      catchError(() => of(null))
    );
  }

}
