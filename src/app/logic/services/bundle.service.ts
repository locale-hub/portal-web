import { Injectable } from '@angular/core';
import {FileFormat} from '../../data/enums/FileFormat.enum';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import ServiceHelper from '../utils/ServiceHelper';

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  private urlProjectId = ':projectId';
  private readonly baseUrl: string = `${environment.api.uri}/projects/${this.urlProjectId}/bundles`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/zip',
    Accept: 'application/json',
    Authorization: this.authService.token(),
    'Access-Control-Allow-Origin': `${environment.api.uri}`,
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get(projectId: string, format: FileFormat): Observable<any> {
    const url = `${this.baseUrl}?format=${format}`.replace(this.urlProjectId, projectId);
    return this.http.get<any>(url, { responseType: 'arraybuffer' as 'json', headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<any>('get bundle', undefined))
      );
  }
}
