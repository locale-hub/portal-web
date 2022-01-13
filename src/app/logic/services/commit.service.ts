import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import ServiceHelper from '../utils/ServiceHelper';
import {CommitsGetResponse} from '../../data/responses/commits-get.response';
import {CommitsListResponse} from '../../data/responses/commits-list.response';
import {Manifest} from '../../data/models/manifest.model';
import {ManifestWithStatus} from '../../data/models/manifestWithStatus.model';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  private urlProjectId = ':projectId';
  private readonly baseUrl: string = `${environment.api.uri}/projects/${this.urlProjectId}/commits`;
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

  list(projectId: string): Observable<CommitsListResponse> {
    const url = `${this.baseUrl}`.replace(this.urlProjectId, projectId);
    return this.http.get<CommitsListResponse>(url, { headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<CommitsListResponse>('list commit', undefined))
      );
  }

  get(projectId: string, commitId: string): Observable<CommitsGetResponse> {
    const url = `${this.baseUrl}/${commitId}`.replace(this.urlProjectId, projectId);
    return this.http.get<CommitsGetResponse>(url, {
      headers: this.corsHeaders
    }).pipe(
      catchError(ServiceHelper.handleError<CommitsGetResponse>('get commit', undefined))
    );
  }

  post(projectId: string, manifest: ManifestWithStatus, commitTitle: string, commitDescription: string): Observable<void> {
    const changeList: Manifest = {
      locales: manifest.locales,
      keys: manifest.keys,
      manifest: {},
    };

    for (const locale of manifest.locales) {
      if (undefined === changeList.manifest[locale]) {
        changeList.manifest[locale] = {};
      }
      for (const key of manifest.keys) {
        changeList.manifest[locale][key] = manifest.manifest[locale][key].value;
      }
    }

    const url = `${this.baseUrl}`.replace(this.urlProjectId, projectId);
    const body = {
      title: commitTitle,
      description: commitDescription,
      changeList,
    };

    return this.http.post<void>(url, body, { headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<void>('create manifest', undefined))
      );
  }

  publish(projectId: string, commitId: string): Observable<void> {
    const url = `${this.baseUrl}/${commitId}`.replace(this.urlProjectId, projectId);
    return this.http.put<void>(url, {
      deployed: true,
    }, {
      headers: this.corsHeaders
    }).pipe(
      catchError(ServiceHelper.handleError<void>('publish commit', undefined))
    );
  }
}
