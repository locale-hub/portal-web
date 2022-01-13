import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import decode from 'jwt-decode';
import {TokenResponse} from '../../data/responses/token.response';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {User} from '../../data/models/user.model';
import ServiceHelper from '../utils/ServiceHelper';
import {Observable} from 'rxjs';
import {MeDashboardResponse} from '../../data/responses/me-dashboard.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = `${environment.api.uri}/me`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': `${environment.api.uri}`,
    Authorization: this.authService.token(),
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public update(user: User) {
    const url = `${this.baseUrl}`;
    return this.http.put<User>(url, {
      user,
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<TokenResponse>('Update user', undefined)),
      map<TokenResponse, User>((response: TokenResponse) => {
        if (undefined === response) {
          return undefined;
        }
        localStorage.setItem('token', response.token);
        return decode(response.token);
      })
    );
  }

  public updatePassword(passwordOld: string, passwordNew: string) {
    const url = `${this.baseUrl}/password`;
    return this.http.put<void>(url, {
      old: passwordOld,
      new: passwordNew
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('Update user password', undefined))
    );
  }

  public validateEmail(token: string) {
    const url = `${this.baseUrl}/validate-email`;
    return this.http.post<User>(url, {
      token,
    }, {
      headers: this.corsHeaders,
      observe: 'response',
    }).pipe(
      catchError(ServiceHelper.handleError<TokenResponse>('Validate email', undefined)),
      map<HttpResponse<TokenResponse>, User>((response: HttpResponse<TokenResponse>) => {
        if (410 === response.status) { // expired
          return undefined;
        }

        localStorage.setItem('token', response.body.token);
        return decode(response.body.token);
      })
    );
  }

  public dashboard(): Observable<MeDashboardResponse> {
    const url = `${this.baseUrl}/dashboard`;
    // Class Headers are not set properly when used right after login.
    // So we create it in the function.
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': `${environment.api.uri}`,
      Authorization: this.authService.token(),
      'Content-Type': 'application/json'
    });

    return this.http.get<MeDashboardResponse>(url, { headers })
      .pipe(
        catchError(ServiceHelper.handleError<MeDashboardResponse>('dashboard', undefined))
      );
  }

}
