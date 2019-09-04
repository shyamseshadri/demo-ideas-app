import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  login(email: string, password: string) {
    return this.http.post(environment.apiBaseUrl + '/access-tokens', {
      email,
      password,
    }).pipe(
      tap(response => this.authService.handleLogin(response))
    );
  }

  getCurrentUser() {
    return this.http.get(environment.apiBaseUrl + '/me');
  }

  logout() {
    return this.http.request(environment.apiBaseUrl + '/delete', '/access-tokens', {
      body: {
        refresh_token: this.authService.getRefreshToken(),
      },
    }).pipe(
      tap(() => this.authService.handleLogout())
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiBaseUrl + '/users', {
      email,
      name,
      password,
    });
  }

  refreshToken() {
    return this.http.post(environment.apiBaseUrl + '/access-tokens/refresh', {
      refresh_token: this.authService.getRefreshToken(),
    });
  }

  isLoggedIn() {
    return !!this.authService.getJwtToken();
  }
}
