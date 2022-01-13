import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../../data/models/project.model';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import ServiceHelper from '../utils/ServiceHelper';
import {UserRoles} from '../../data/enums/UserRoles.enum';
import {ProjectsListResponse} from '../../data/responses/projects-list.response';
import {ProjectsGetResponse} from '../../data/responses/projects-get.response';
import {ProjectsPostResponse} from '../../data/responses/projects-post.response';
import {ProjectsUsersGetResponse} from '../../data/responses/projects-users-get.response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string = `${environment.api.uri}/projects`;
  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.authService.token(),
    'Access-Control-Allow-Origin': `${environment.api.uri}`
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  list(): Observable<ProjectsListResponse> {
    const url = `${this.baseUrl}`;
    return this.http.get<ProjectsListResponse>(url, { headers: this.corsHeaders })
      .pipe(
        catchError(ServiceHelper.handleError<ProjectsListResponse>('list projects', undefined))
      );
  }

  get(id: string): Observable<ProjectsGetResponse> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ProjectsGetResponse>(url, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<ProjectsGetResponse>(`get project id=${id}`, undefined))
    );
  }

  create(project: Project): Observable<ProjectsPostResponse> {
    const url = `${this.baseUrl}`;
    return this.http.post<ProjectsPostResponse>(url, project, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<ProjectsPostResponse>(`post project`, undefined))
    );
  }

  put(project: Project): Observable<void> {
    const url = `${this.baseUrl}/${project.id}`;
    return this.http.put<void>(url, project, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<void>(`updated project id=${project.id}`, undefined))
    );
  }

  delete(project: Project): Observable<void> {
    const url = `${this.baseUrl}/${project.id}`;
    return this.http.delete<void>(url, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<void>(`deleted project id=${project.id}`, undefined))
    );
  }

  getUsers(id: string): Observable<ProjectsUsersGetResponse> {
    const url = `${this.baseUrl}/${id}/users`;
    return this.http.get<ProjectsUsersGetResponse>(url, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<ProjectsUsersGetResponse>('get project users', undefined))
    );
  }

  addUser(projectId: string, userId: string): Observable<void> {
    const url = `${this.baseUrl}/${projectId}/users`;
    return this.http.post<void>(url, {
      userId,
      role: UserRoles.USER,
    }, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<void>('add project users', undefined))
    );
  }

  deleteUser(projectId: string, userId: string): Observable<void> {
    const url = `${this.baseUrl}/${projectId}/users/${userId}`;
    return this.http.delete<void>(url, { headers: this.corsHeaders }).pipe(
      catchError(ServiceHelper.handleError<void>('delete project users', undefined))
    );
  }
}
