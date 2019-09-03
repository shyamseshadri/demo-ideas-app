import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('/access-tokens', {
      email,
      password,
    });
  }

  getCurrentUser() {
    return this.http.get('/me');
  }

  logout(refreshToken: string) {
    return this.http.request('delete', '/access-tokens', {
      body: {
        refresh_token: refreshToken,
      },
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post('/users', {
      email,
      name,
      password,
    });
  }

  isLoggedIn() {
    return false;
  }
}
