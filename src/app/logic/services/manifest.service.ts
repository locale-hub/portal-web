import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Manifest} from '../../data/models/manifest.model';
import {AuthService} from './auth.service';
import ServiceHelper from '../utils/ServiceHelper';
import {ManifestsGetResponse} from '../../data/responses/manifests-get.response';
import {ManifestsHistoryGetResponse} from '../../data/responses/manifests-history-get.response';
import {ManifestEntry} from '../../data/models/manifestEntry.model';
import {KeyStatus} from '../../data/enums/keyStatus.enum';

type ManifestsGetResponseWithoutStatus = {
  manifest: Manifest;
};

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  private urlProjectId = ':projectId';
  private readonly baseUrl: string = `${environment.api.uri}/projects/${this.urlProjectId}/manifests`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.authService.token(),
    'Access-Control-Allow-Origin': `${environment.api.uri}`
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  get(projectId: string): Observable<ManifestsGetResponse> {
    const url = `${this.baseUrl}`.replace(this.urlProjectId, projectId);
    return this.http.get<ManifestsGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<ManifestsGetResponse>('get manifest', undefined)),
        map<ManifestsGetResponseWithoutStatus, ManifestsGetResponse>((response): ManifestsGetResponse => {
          const manifest: { [locale: string]: { [key: string]: ManifestEntry } } = {};

          for (const locale of response.manifest.locales) {
            if (undefined === manifest[locale]) {
              manifest[locale] = {};
            }
            for (const key of response.manifest.keys) {
              manifest[locale][key] = {
                key,
                locale,
                value: response.manifest.manifest[locale][key],
                status: KeyStatus.DEFAULT,
                translatable: true,
              };
            }
          }

          return {
            manifest: {
              keys: response.manifest.keys,
              locales: response.manifest.locales,
              manifest,
            }
          };
        }),
      );
  }

  getHistory(projectId: string, key: string, locale: string): Observable<ManifestsHistoryGetResponse> {
    const url = `${this.baseUrl}/history?key=${key}&locale=${locale}`.replace(this.urlProjectId, projectId);

    return this.http.get<ManifestsHistoryGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<ManifestsHistoryGetResponse>('get history', undefined))
      );
  }
}
