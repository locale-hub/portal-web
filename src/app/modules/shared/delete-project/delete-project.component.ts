import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../../data/models/project.model';
import {ProjectService} from '../../../logic/services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent {
  projectNameConfirmation: string;
  project: Project;

  constructor(
    private dialogRef: MatDialogRef<DeleteProjectComponent>,
    private projectsService: ProjectService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteProject() {
    this.projectsService.delete(this.project)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
