import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommitService} from '../../../logic/services/commit.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-publish-commit',
  templateUrl: './publish-commit.component.html',
  styleUrls: ['./publish-commit.component.scss']
})
export class PublishCommitComponent extends BaseComponent {
  commitId: string;
  projectId: string;

  constructor(
    private dialogRef: MatDialogRef<PublishCommitComponent>,
    private commitService: CommitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.projectId = data.projectId;
    this.commitId = data.commitId;
  }

  close() {
    this.dialogRef.close(false);
  }

  deleteApp() {
    this.commitService
      .publish(this.projectId, this.commitId)
      .subscribe(() => {
        this.dialogRef.close(true);
      })
      .addTo(this.disposeBag);
  }
}
