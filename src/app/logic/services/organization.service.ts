import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import ServiceHelper from '../utils/ServiceHelper';
import {Organization} from '../../data/models/organization.model';
import {OrganizationsGetResponse} from '../../data/responses/organizations-get.response';
import {OrganizationsUsageGetResponse} from '../../data/responses/organizations-usage-get.response';
import {OrganizationsUsersGetResponse} from '../../data/responses/organizations-users-get.response';
import {OrganizationsPostResponse} from '../../data/responses/organizations-post.response';
import {OrganizationsProjectsGetResponse} from '../../data/responses/organizations-projects-get.response';
import {OrganizationsPaymentMethodsGetResponse} from '../../data/responses/organizations-paymentMethods-get.response';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private readonly baseUrl: string = `${environment.api.uri}/organizations`;
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

  get(organizationId: string): Observable<OrganizationsGetResponse> {
    const url = `${this.baseUrl}/${organizationId}`;
    return this.http.get<OrganizationsGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<OrganizationsGetResponse>('get organization', undefined))
      );
  }

  create(organization: Organization): Observable<OrganizationsPostResponse> {
    const url = `${this.baseUrl}`;
    return this.http.post<OrganizationsPostResponse>(url, {
      organization: {
        name: organization.name,
      },
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<OrganizationsPostResponse>('Organization created', undefined))
    );
  }

  update(organization: Organization): Observable<void> {
    const url = `${this.baseUrl}/${organization.id}`;
    return this.http.put<void>(url, organization, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<void>('update organization', undefined))
      );
  }

  usage(organizationId: string): Observable<OrganizationsUsageGetResponse> {
    const url = `${this.baseUrl}/${organizationId}/usage`;
    return this.http.get<OrganizationsUsageGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<OrganizationsUsageGetResponse>('get organization usage', undefined))
      );
  }

  projects(organizationId: string): Observable<OrganizationsProjectsGetResponse> {
    const url = `${this.baseUrl}/${organizationId}/projects`;
    return this.http.get<OrganizationsProjectsGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<OrganizationsProjectsGetResponse>('list projects', undefined))
      );
  }

  users(organizationId: string): Observable<OrganizationsUsersGetResponse> {
    const url = `${this.baseUrl}/${organizationId}/users`;
    return this.http.get<OrganizationsUsersGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<OrganizationsUsersGetResponse>('list users', undefined))
      );
  }

  paymentMethods(organizationId: string): Observable<OrganizationsPaymentMethodsGetResponse> {
    const url = `${this.baseUrl}/${organizationId}/payment-methods`;
    return this.http.get<OrganizationsPaymentMethodsGetResponse>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<OrganizationsPaymentMethodsGetResponse>('list paymentMethods', undefined))
      );
  }

  inviteUser(organizationId: string, email: string, name: string): Observable<void> {
    const url = `${this.baseUrl}/${organizationId}/users/invite`;
    return this.http.post<void>(url, {
      name,
      primaryEmail: email,
    }, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('User invited', undefined))
    );
  }

  revokeUser(userId: string): Observable<void> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete<void>(url, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('User revoked', undefined))
    );
  }

  delete(organization: Organization) {
    const url = `${this.baseUrl}/${organization.id}`;
    return this.http.delete<void>(url, {
      headers: this.corsHeaders,
    }).pipe(
      catchError(ServiceHelper.handleError<void>('Organization deleted', undefined))
    );
  }

  deletePaymentMethod(organizationId: string, paymentMethodId: string): Observable<void> {
    const url = `${this.baseUrl}/${organizationId}/payment-methods/${paymentMethodId}`;
    return this.http.delete<void>(url, {headers: this.corsHeaders})
      .pipe(
        catchError(ServiceHelper.handleError<void>('delete paymentMethods', undefined))
      );
  }
}
