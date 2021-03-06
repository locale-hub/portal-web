import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Project} from '../../../data/models/project.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../logic/services/project.service';
import {Locale} from '../../../data/models/locale.model';
import {LocaleService} from '../../../logic/services/locale.service';
import {MessageService} from '../../../logic/services/message.service';
import {DeleteProjectComponent} from '../../shared/delete-project/delete-project.component';
import {ArchiveProjectComponent} from '../../shared/archive-project/archive-project.component';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent extends BaseComponent implements OnInit {
  projectId: string;
  project: Project;
  users: User[];
  locales: Locale[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    private projectService: ProjectService,
    private localeService: LocaleService,
    private organizationService: OrganizationService
  ) {
    super();
  }

  ngOnInit() {
    const projectId$ = this.route.paramMap
      .pipe(
        map((params) => params.get('projectId')),
      );

    projectId$
      .pipe(
        mergeMap(projectId => this.projectService.get(projectId)),
        filter(data => undefined !== data),
        map(data => data.project),
        tap(project => this.project = project),
        mergeMap(project => this.organizationService.users(project.organizationId)),
        filter(data => undefined !== data),
        map(data => data.users),
      )
      .subscribe(users => {
        this.users = users.sort((a: User, b: User) => {
          return a.name.localeCompare(b.name);
        });
      })
      .addTo(this.disposeBag);

    this.localeService
      .list()
      .subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.locales = data.locales.sort((a: Locale, b: Locale) => {
          return a.name.localeCompare(b.name);
        });
      })
      .addTo(this.disposeBag);
  }

  saveProject() {
    this.projectService
      .put(this.project)
      .subscribe((data) => {
        if (undefined === data) {
          return;
        }

        this.messageService.log('Project updated');
      })
      .addTo(this.disposeBag);
  }

  openArchiveDialog() {
    this.dialog.open(ArchiveProjectComponent, {
      data: {project: this.project},
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteProjectComponent, {
      data: {project: this.project},
    });
  }

}
