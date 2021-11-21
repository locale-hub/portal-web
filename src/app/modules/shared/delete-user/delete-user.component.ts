import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../logic/services/user.service';
import {OrganizationService} from '../../../logic/services/organization.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  userId: string;
  userName: string;

  constructor(
    private organizationService: OrganizationService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;
    this.userName = data.userName;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteUser() {
    this.organizationService.revokeUser(this.userId)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
