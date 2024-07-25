import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenService} from "./token.service";
import {environment as env} from '../../../environments/environment';
import {ILogin, ILoginForm} from "../models/login.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${env.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  login(formData: ILoginForm): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.apiUrl}/token/login/`, formData);
  }

  isAuthenticated(): boolean {
    return (!!this.tokenService.token);
  }
}
