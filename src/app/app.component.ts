import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './logic/services/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MessageService} from './logic/services/message.service';
import {environment} from '../environments/environment';
import {interval, Subscription} from 'rxjs';
import {CreateProjectComponent} from './modules/shared/create-project/create-project.component';
import {Project} from './data/models/project.model';
import {MatDialog} from '@angular/material/dialog';
import {CreateOrganizationComponent} from './modules/shared/create-organization/create-organization.component';
import {Organization} from './data/models/organization.model';
import {UserService} from './logic/services/user.service';
import {RouteDataModel} from './data/models/route-data.model';
import {BaseComponent} from './modules/helpers/BaseComponent';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  config = environment;
  refreshTokenSubscription: Subscription;

  version = environment.version;
  isProduction = 'production' === environment.environment;

  isUserAuthenticated = false;

  currentPageName = '';
  organizations: Organization[];
  projects: Project[];

  isReducedMenu: boolean;
  showOrganizations: boolean;
  showProjects: boolean;

  constructor(
    private messageService: MessageService, // required to create the static instance
    public authService: AuthService,
    private userService: UserService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        const data = (this.route.snapshot.firstChild.firstChild ?? this.route.snapshot.firstChild).data as RouteDataModel;

        this.currentPageName = data.sectionName;
        switch (this.currentPageName) {
          case 'organizations':
            this.showOrganizations = true;
            break;
          case 'projects':
            this.showProjects = true;
            break;
        }

        if (this.isProduction) {
          const sectionName = data.sectionName + (undefined !== data.subSectionName ? `-${data.subSectionName}` : '');
          gtag('config', 'G-P6XQM6NRST', {
            page_path: sectionName,
          });
        }
      })
      .addTo(this.disposeBag);

    this.isUserAuthenticated = this.authService.isAuthenticated();
    if (this.isUserAuthenticated) {
      this.userService.dashboard()
        .subscribe((data) => {
          if (undefined === data) {
            return;
          }
          this.organizations = data.organizations;
          this.projects = data.projects;
        })
        .addTo(this.disposeBag);
    }

    AuthService.onUserLogin
      .subscribe((user) => {
        if (undefined === user) {
          this.isUserAuthenticated = false;
          return;
        }
        this.isUserAuthenticated = true;

        this.userService.dashboard().subscribe((data) => {
          if (undefined === data) {
            return;
          }
          this.organizations = data.organizations;
          this.projects = data.projects;
        });

        interval(environment.refreshTokenInterval)
          .subscribe(() => {
            this.authService.refreshToken();
          })
          .addTo(this.disposeBag);
      })
      .addTo(this.disposeBag);
  }

  async logout() {
    this.isUserAuthenticated = false;
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  openSdkDocumentation() {
    window.open(environment.documentation.uri, '_blank');
  }

  openCreateProjectDialog(): void {
    this.dialog.open(CreateProjectComponent)
      .afterClosed()
      .subscribe(async (project: Project) => {
        if (undefined === project) {
          return;
        }

        await this.router.navigate(['/projects', project.id]);
      })
      .addTo(this.disposeBag);
  }

  openCreateOrganizationDialog() {
    this.dialog.open(CreateOrganizationComponent)
      .afterClosed()
      .subscribe(async (organization: Organization) => {
        if (undefined === organization) {
          return;
        }

        await this.router.navigate(['/organizations', organization.id, 'projects']);
      })
      .addTo(this.disposeBag);
  }
}
