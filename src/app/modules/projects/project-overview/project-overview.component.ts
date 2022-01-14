import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../logic/services/project.service';
import {environment} from '../../../../environments/environment';
import {ProjectsGetResponse} from '../../../data/responses/projects-get.response';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent extends BaseComponent implements OnInit {
  sdkFeatureEnabled = environment.features.sdk;
  objectKeys = Object.keys;

  data: ProjectsGetResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
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
      )
      .subscribe(data => {
        this.data = data;
      })
      .addTo(this.disposeBag);
  }

  openSdkDocumentation() {
    window.open(environment.documentation.uri, '_blank');
  }
}
