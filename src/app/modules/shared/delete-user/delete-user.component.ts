import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrganizationService} from '../../../logic/services/organization.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent extends BaseComponent {
  userId: string;
  userName: string;

  constructor(
    private organizationService: OrganizationService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.userId = data.userId;
    this.userName = data.userName;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteUser() {
    this.organizationService
      .revokeUser(this.userId)
      .subscribe(() => {
        this.dialogRef.close();
      })
      .addTo(this.disposeBag);
  }
}
