import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import ServiceHelper from '../utils/ServiceHelper';
import {LocalesListResponse} from '../../data/responses/locales-list.response';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private readonly baseUrl: string = `${environment.api.uri}/locales`;
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

  list(): Observable<LocalesListResponse> {
    return this.http.get<LocalesListResponse>(this.baseUrl, { headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<LocalesListResponse>('list locales', undefined))
      );
  }
}
