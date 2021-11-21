import {Component, OnInit} from '@angular/core';

import { ProjectService } from '../../../logic/services/project.service';
import { Project } from '../../../data/models/project.model';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTranslationProgress} from '../../../data/models/project-translation-progress.model';
import {DeleteProjectComponent} from '../../shared/delete-project/delete-project.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-organizations-projects',
  templateUrl: './organizations-projects.component.html',
  styleUrls: ['./organizations-projects.component.scss']
})
export class OrganizationsProjectsComponent implements OnInit {
  projects: Project[];
  progress: ProjectTranslationProgress[];
  users: { [id: string]: User };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectService,
    private organizationService: OrganizationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const organizationId = params.get('organizationId');
      this.organizationService.projects(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.projects = data.projects;
        this.progress = data.progress;
      });

      this.organizationService.users(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.users = data.users.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});
      });
    });
  }

  getProgress(projectId: string) {
    const result = this.progress.filter((item) => projectId === item.projectId);
    const percentage = 0 !== result.length ? result[0].progress : 0;
    return Math.round(percentage * 100);
  }

  openDeleteDialogForProject(project: Project) {
    this.dialog.open(DeleteProjectComponent, {
      data: { project },
    });
  }
}
