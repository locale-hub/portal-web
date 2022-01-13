import { Component, OnInit } from '@angular/core';
import {Project} from '../../../data/models/project.model';
import {UserService} from '../../../logic/services/user.service';
import {Organization} from '../../../data/models/organization.model';
import {ProjectTranslationProgress} from '../../../data/models/project-translation-progress.model';
import {DeleteProjectComponent} from '../../shared/delete-project/delete-project.component';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseComponent implements OnInit {
  organizations: Organization[];
  projects: Project[];
  progress: ProjectTranslationProgress[];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.dashboard().subscribe((data) => {
      if (undefined === data) {
        return;
      }
      this.organizations = data.organizations;
      this.projects = data.projects;
      this.progress = data.progress;
    });
  }

  organizationName(organizationId: string): string {
    return this.organizations
      .filter((o) => o.id === organizationId)[0]?.name
      ?? organizationId;
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
