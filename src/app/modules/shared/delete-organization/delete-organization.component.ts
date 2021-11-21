import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../../data/models/project.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../logic/services/project.service';
import {Router} from '@angular/router';
import {Organization} from '../../../data/models/organization.model';
import {OrganizationService} from '../../../logic/services/organization.service';

@Component({
  selector: 'app-delete-organization',
  templateUrl: './delete-organization.component.html',
  styleUrls: ['./delete-organization.component.scss']
})
export class DeleteOrganizationComponent implements OnInit {
  organizationNameConfirmation: string;
  organization: Organization;

  constructor(
    private dialogRef: MatDialogRef<DeleteOrganizationComponent>,
    private organizationService: OrganizationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.organization = data.organization;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteProject() {
    this.organizationService.delete(this.organization)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
