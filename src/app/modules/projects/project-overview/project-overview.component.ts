import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../logic/services/project.service';
import { Project } from '../../../data/models/project.model';
import {environment} from '../../../../environments/environment';
import {ProjectsGetResponse} from '../../../data/responses/projects-get.response';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  sdkFeatureEnabled = environment.features.sdk;
  objectKeys = Object.keys;

  data: ProjectsGetResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectId');

      this.projectsService.get(projectId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }

        this.data = data;
      });
    });
  }

  openSdkDocumentation() {
    window.open(environment.documentation.uri, '_blank');
  }
}
