import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../../data/models/project.model';
import {ProjectService} from '../../../logic/services/project.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-archive-project',
  templateUrl: './archive-project.component.html',
  styleUrls: ['./archive-project.component.scss']
})
export class ArchiveProjectComponent implements OnInit {
  projectNameConfirmation: string;
  project: Project;

  constructor(
    private dialogRef: MatDialogRef<ArchiveProjectComponent>,
    private projectsService: ProjectService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(undefined);
  }

  archiveProject() {
    this.project.archived = true;
    this.projectsService.put(this.project)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
