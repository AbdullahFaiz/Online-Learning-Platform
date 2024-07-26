import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const TOKEN_KEY = 'auth-token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();  

    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);  

    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);  

  }

}
