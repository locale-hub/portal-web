import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {App} from '../../data/models/app.model';
import {AuthService} from './auth.service';
import ServiceHelper from '../utils/ServiceHelper';
import {AppsListResponse} from '../../data/responses/apps-list.response';
import {AppsPostResponse} from '../../data/responses/apps-post.response';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private urlProjectId = ':projectId';
  private readonly baseUrl: string = `${environment.api.uri}/projects/${this.urlProjectId}/apps`;
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

  list(projectId: string): Observable<AppsListResponse> {
    const url = `${this.baseUrl}`.replace(this.urlProjectId, projectId);
    return this.http.get<AppsListResponse>(url, { headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<AppsListResponse>('list apps', undefined))
      );
  }

  create(projectId: string, app: App): Observable<AppsPostResponse> {
    const url = `${this.baseUrl}`.replace(this.urlProjectId, projectId);
    return this.http.post<AppsPostResponse>(url, app, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<AppsPostResponse>(`post app`, undefined))
    );
  }

  delete(app: App): Observable<boolean> {
    const url = `${this.baseUrl}/${app.id}`.replace(this.urlProjectId, app.projectId);
    return this.http.delete<boolean>(url, { headers: this.corsHeaders, observe: 'response' })
      .pipe(
        map(response => 204 === response.status),
        catchError(ServiceHelper.handleError(`deleted app id=${app.id}`, false))
      );
  }
}
