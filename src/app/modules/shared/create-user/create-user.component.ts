import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrganizationService} from '../../../logic/services/organization.service';
import {MessageService} from '../../../logic/services/message.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent extends BaseComponent {
  organizationId: string;
  userInviteForm: FormGroup;
  userInvite: { organizationId: string, email: string, name: string } = {
    organizationId: '',
    name: '',
    email: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private organizationService: OrganizationService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.organizationId = data.organizationId;
    this.userInviteForm = new FormGroup({
      name: new FormControl(this.userInvite.name, [
        Validators.required,
      ]),
      email: new FormControl(this.userInvite.email, [
        Validators.required,
        Validators.email,
      ])
    });
  }

  close() {
    this.dialogRef.close(undefined);
  }

  create() {
    this.organizationService
      .inviteUser(this.organizationId, this.userInvite.email, this.userInvite.name)
      .subscribe(() => {
        this.messageService.log(`User ${this.userInvite.name} has been invited by email.`);
        this.dialogRef.close();
      })
      .addTo(this.disposeBag);
  }

}
