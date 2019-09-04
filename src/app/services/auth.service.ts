import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_DATA = 'USER_DATA';

  constructor() { }

  handleLogin(loginBody) {
    this.storeTokens(loginBody);
  }

  handleLogout() {
    this.removeTokens();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getUserData(): any {
    return localStorage.getItem(this.USER_DATA) ? JSON.parse(localStorage.getItem(this.USER_DATA)) : null;
  }

  storeJwtToken(jwt) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  storeUserData(user) {
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }

  private storeTokens(tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_DATA);
  }
}
