import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {App} from '../../../data/models/app.model';
import {AppService} from '../../../logic/services/app.service';
import {CreateAppComponent} from '../../shared/create-app/create-app.component';
import {MessageService} from '../../../logic/services/message.service';
import {DeleteAppComponent} from '../../shared/delete-app/delete-app.component';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-project-apps',
  templateUrl: './project-apps.component.html',
  styleUrls: ['./project-apps.component.scss']
})
export class ProjectAppsComponent extends BaseComponent implements OnInit {
  projectId: string;
  apps: App[];
  isFeatureEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super();
    this.route.paramMap
      .subscribe(params => {
        this.projectId = params.get('projectId');
      })
      .addTo(this.disposeBag);
  }

  ngOnInit(): void {
    this.isFeatureEnabled = true;
    this.appService
      .list(this.projectId)
      .subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.isFeatureEnabled = undefined !== data.applications;
        this.apps = data.applications;
      })
      .addTo(this.disposeBag);
  }

  openCreateAppDialog(): void {
    this.dialog
      .open(CreateAppComponent, {
        data: {
          projectId: this.projectId
        }
      })
      .afterClosed()
      .subscribe(() => this.ngOnInit())
      .addTo(this.disposeBag);
  }

  openDeleteAppDialog(app: App): void {
    this.dialog
      .open(DeleteAppComponent, {
        data: {
          app
        }
      })
      .afterClosed()
      .subscribe((response: { app: App, isDeleted: boolean }) => {
        if (response.isDeleted) {
          this.messageService.log(`App ${app.name} deleted`);
          this.apps = this.apps.filter(value => app.id !== value.id);
        }
      })
      .addTo(this.disposeBag);
  }
}
