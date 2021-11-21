import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {TokenResponse} from '../../data/responses/token.response';
import {User} from '../../data/models/user.model';
import {UserRegisterRequest} from '../../data/requests/userRegister.request';
import ServiceHelper from '../utils/ServiceHelper';
import {JwtModel} from '../../data/models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static onUserLogin: Subject<User> = new Subject<User>();

  private readonly baseUrl: string = `${environment.api.uri}/auth`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': `${environment.api.uri}`,
    'Content-Type': 'application/json'
  });

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  public resetPasswordRequest(email: string) {
    const url = `${this.baseUrl}/password-reset`;
    return this.http.post<void>(url, {
      primaryEmail: email
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('password-reset', undefined))
    );
  }

  public resetPasswordApply(token: string, email: string, password: string) {
    const url = `${this.baseUrl}/password-reset/apply`;
    return this.http.post<void>(url, {
      token,
      primaryEmail: email,
      password
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('password-reset apply', undefined)),
      map<TokenResponse, User>((response: TokenResponse) => {
        if (undefined === response) {
          return undefined;
        }
        localStorage.setItem('token', response.token);
        return decode(response.token);
      })
    );
  }

  public authenticate(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<TokenResponse>(url, {
      primaryEmail: email,
      password
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<TokenResponse>('login', undefined)),
      map<TokenResponse, User>((response: TokenResponse) => {
        if (undefined === response) {
          return undefined;
        }
        localStorage.setItem('token', response.token);
        return decode(response.token);
      }),
      tap((user: User) => AuthService.onUserLogin.next(user)),
    );
  }

  public refreshToken() {
    const url = `${this.baseUrl}/refresh-token`;
    return this.http.post<TokenResponse>(url, {}, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<TokenResponse>('refresh token', undefined)),
      map<TokenResponse, User>((response: TokenResponse) => {
        if (undefined === response) {
          return undefined;
        }
        localStorage.setItem('token', response.token);
        return decode(response.token);
      })
    );
  }

  public register(userName: string,
                  userEmail: string, userPassword: string) {
    const url = `${this.baseUrl}/register`;

    const body: UserRegisterRequest = {
      user: {
        name: userName,
        primaryEmail: userEmail,
        password: userPassword
      }
    };

    return this.http.post<TokenResponse>(url, body, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<TokenResponse>('register', undefined)),
      map<TokenResponse, User>((response: TokenResponse) => {
        if (undefined === response) {
          return undefined;
        }
        localStorage.setItem('token', response.token);
        return decode(response.token);
      }),
      tap((user: User) => AuthService.onUserLogin.next(user))
    );
  }

  public logout() {
    localStorage.removeItem('token');
    AuthService.onUserLogin.next(undefined); // notify listeners
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public token(): string {
    return localStorage.getItem('token');
  }

  public user(): User {
    const jwt = decode(localStorage.getItem('token')) as JwtModel;
    return jwt.user;
  }
}
