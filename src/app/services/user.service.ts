import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  login(email: string, password: string) {
    return this.http.post(environment.apiBaseUrl + '/access-tokens', {
      email,
      password,
    }).pipe(
      tap(response => this.authService.handleLogin(response)),
      mergeMap(() => this.fetchCurrentUser()),
      tap((user) => {
        this.authService.storeUserData(user);
      })
    );
  }

  fetchCurrentUser() {
    return this.http.get(environment.apiBaseUrl + '/me');
  }

  logout() {
    return this.http.request(environment.apiBaseUrl + '/delete', '/access-tokens', {
      body: {
        refresh_token: this.authService.getRefreshToken(),
      },
    }).pipe(
      tap(() => {
        this.user = null;
        this.authService.handleLogout();
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiBaseUrl + '/users', {
      email,
      name,
      password,
    }).pipe(
      tap(response => this.authService.handleLogin(response)),
      mergeMap(() => this.fetchCurrentUser()),
      tap((user) => {
        this.authService.storeUserData(user);
      })
    );
  }

  refreshToken() {
    return this.http.post(environment.apiBaseUrl + '/access-tokens/refresh', {
      refresh_token: this.authService.getRefreshToken(),
    }).pipe(
      tap((response: any) => this.authService.storeJwtToken(response.jwt))
    );
  }

  isLoggedIn() {
    return !!this.authService.getJwtToken();
  }
}
