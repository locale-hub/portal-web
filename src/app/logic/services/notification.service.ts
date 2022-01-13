import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MeNotificationsResponse} from '../../data/responses/me-notifications.response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import ServiceHelper from '../utils/ServiceHelper';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly baseUrl: string = `${environment.api.uri}/notifications`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': `${environment.api.uri}`,
    Authorization: this.authService.token(),
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public list(): Observable<MeNotificationsResponse> {
    const url = `${this.baseUrl}`;

    return this.http.get<MeNotificationsResponse>(url, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<MeNotificationsResponse>('list notifications', undefined))
    );
  }

  public discard(notificationId: string): Observable<void> {
    const url = `${this.baseUrl}/${notificationId}`;

    return this.http.delete<void>(url, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('delete notifications', undefined))
    );
  }
}
