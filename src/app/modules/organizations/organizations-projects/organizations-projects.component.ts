import {Component, OnInit} from '@angular/core';

import {ProjectService} from '../../../logic/services/project.service';
import {Project} from '../../../data/models/project.model';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTranslationProgress} from '../../../data/models/project-translation-progress.model';
import {DeleteProjectComponent} from '../../shared/delete-project/delete-project.component';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-projects',
  templateUrl: './organizations-projects.component.html',
  styleUrls: ['./organizations-projects.component.scss']
})
export class OrganizationsProjectsComponent extends BaseComponent implements OnInit {
  projects: Project[];
  progress: ProjectTranslationProgress[];
  users: { [id: string]: User };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectService,
    private organizationService: OrganizationService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    const organizationId$ = this.route.paramMap
      .pipe(
        map((params) => params.get('organizationId')),
      );

    organizationId$
      .pipe(
        mergeMap(organizationId => this.organizationService.projects(organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.projects = data.projects;
        this.progress = data.progress;
      })
      .addTo(this.disposeBag);

    organizationId$
      .pipe(
        mergeMap(organizationId => this.organizationService.users(organizationId)),
        filter(data => undefined !== data),
        map(data => data.users),
      )
      .subscribe(users => {
        this.users = users.reduce((map, user) => { map[user.id] = user; return map; }, {});
      })
      .addTo(this.disposeBag);
  }

  getProgress(projectId: string) {
    const result = this.progress.filter((item) => projectId === item.projectId);
    const percentage = 0 !== result.length ? result[0].progress : 0;
    return Math.round(percentage * 100);
  }

  openDeleteDialogForProject(project: Project) {
    this.dialog.open(DeleteProjectComponent, {
      data: {project},
    });
  }
}
