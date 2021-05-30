import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthResult } from '../models/authResult.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string = null;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get currentUsername() {
    return this.currentUser;
  }

  login(model: LoginModel): Observable<AuthResult> {
    return this.http.post<AuthResult>('http://localhost:42069/api/login', model).pipe(
      filter(r => {
        return !this.isAuthenticated();
      }),
      tap(r => {
        if (!!r.username) {
          this.currentUser = r.username;
        }
      })
    );
  }

  register(model: RegisterModel): Observable<AuthResult> {
    return this.http.post<AuthResult>('http://localhost:42069/api/register', model).pipe(
      filter(r => {
        return !this.isAuthenticated();
      }),
      tap(r => {
        if (!!r.username) {
          this.currentUser = r.username;
        }
      })
    );
  }
}
