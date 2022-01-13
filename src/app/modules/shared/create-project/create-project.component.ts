import {Component} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Project } from '../../../data/models/project.model';
import { ProjectService } from '../../../logic/services/project.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../logic/services/message.service';
import {Organization} from '../../../data/models/organization.model';
import {UserService} from '../../../logic/services/user.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent extends BaseComponent {
  organizations: Organization[];
  projectFrom: FormGroup;
  project: Project = {
    id: '',
    organizationId: '',
    userId: '',
    name: '',
    defaultLocale: 'en',
    archived: false,
    createdAt: '',
    users: [],
    userGroups: [],
  };

  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    private projectsService: ProjectService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    super();
    this.projectFrom = new FormGroup({
      name: new FormControl(this.project.name, [
        Validators.required,
      ]),
    });

    this.userService.dashboard().subscribe((data) => {
      if (undefined === data) {
        return;
      }
      this.organizations = data.organizations;
    });
  }

  create() {
    this.projectsService.create(this.project)
      .subscribe((data) => {
        if (undefined === data) {
          return;
        }

        const project = data.project;
        this.messageService.log(`Project ${project.name} created!`);
        this.dialogRef.close(project);
      });
  }

  close() {
    this.dialogRef.close(undefined);
  }
}
