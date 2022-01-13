import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../logic/services/project.service';
import {Project} from '../../data/models/project.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../logic/services/auth.service';
import {environment} from '../../../environments/environment';
import {BaseComponent} from '../helpers/BaseComponent';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  sdkFeatureEnabled = environment.features.sdk;
  project: Project;

  isReducedMenu: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const projectId = params.get('projectId');
        this.projectService.get(projectId).subscribe(async (data) => {
          if (undefined === data) {
            return await this.router.navigate(['/']);
          }
          this.project = data.project;
        });
      })
      .addTo(this.disposeBag);
  }

  leaveProject() {
    const confirmProjectLeave = confirm(`Are you sure you want to leave ${this.project.name} project?`);
    if (confirmProjectLeave) {
      const user = this.authService.user();
      this.projectService
        .deleteUser(this.project.id, user.id)
        .subscribe(async (data) => {
          await this.router.navigate(['/']);
        })
        .addTo(this.disposeBag);
    }
  }
}
