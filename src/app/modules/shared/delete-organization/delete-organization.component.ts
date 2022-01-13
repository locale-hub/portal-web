import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Organization} from '../../../data/models/organization.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-delete-organization',
  templateUrl: './delete-organization.component.html',
  styleUrls: ['./delete-organization.component.scss']
})
export class DeleteOrganizationComponent extends BaseComponent {
  organizationNameConfirmation: string;
  organization: Organization;

  constructor(
    private dialogRef: MatDialogRef<DeleteOrganizationComponent>,
    private organizationService: OrganizationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.organization = data.organization;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteProject() {
    this.organizationService
      .delete(this.organization)
      .subscribe(() => {
        this.router.navigate(['/']);
      })
      .addTo(this.disposeBag);
  }
}
