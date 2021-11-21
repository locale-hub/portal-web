import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import ServiceHelper from '../utils/ServiceHelper';
import {PlansType} from '../../data/enums/PlansType.enum';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly baseUrl: string = `${environment.api.hostname}/organizations`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.authService.token(),
    'Access-Control-Allow-Origin': `${environment.api.hostname}`
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  update(organizationId: string, plan: PlansType): Observable<boolean> {
    const url = `${this.baseUrl}/${organizationId}/subscription`;
    return this.http.put<boolean>(url, {
      plan,
    }, { headers: this.corsHeaders })
      .pipe(
        tap(_ => true),
        catchError(ServiceHelper.handleError<boolean>('update org subscription', false)),
      );
  }
}
