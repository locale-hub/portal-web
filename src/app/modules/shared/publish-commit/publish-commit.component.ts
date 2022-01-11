import {Component, Inject, OnInit} from '@angular/core';
import {App} from '../../../data/models/app.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppService} from '../../../logic/services/app.service';
import {CommitService} from '../../../logic/services/commit.service';

@Component({
  selector: 'app-publish-commit',
  templateUrl: './publish-commit.component.html',
  styleUrls: ['./publish-commit.component.scss']
})
export class PublishCommitComponent {
  commitId: string;
  projectId: string;

  constructor(
    private dialogRef: MatDialogRef<PublishCommitComponent>,
    private commitService: CommitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
    this.commitId = data.commitId;
  }

  close() {
    this.dialogRef.close(false);
  }

  deleteApp() {
    this.commitService.publish(this.projectId, this.commitId)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
