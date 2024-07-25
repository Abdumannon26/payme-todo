import {Injectable} from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token: string;

  constructor(
    private storage: SessionStorageService,
    private router: Router
  ) {
  }

  get token(): string {
    if (!this._token) {
      this._token = this.storage.get(TOKEN);
    }
    return this._token;
  }

  setTokens(token: string): void {
    this._token = token;
    this.storage.set(TOKEN, token);
  }

  getTokens(): any {
    return this.storage.get(TOKEN)
  }

  clearTokens(): void {
    this.storage.remove(TOKEN);
  }

  logout(): void {
    this.clearTokens();
    this.router.navigate(['/login'])
      .catch();
  }
}

export const TOKEN = 'token';
