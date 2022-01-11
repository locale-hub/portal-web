import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../logic/services/organization.service';
import {User} from '../../../data/models/user.model';
import {Organization} from '../../../data/models/organization.model';
import {MessageService} from '../../../logic/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteOrganizationComponent} from '../../shared/delete-organization/delete-organization.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-organizations-settings',
  templateUrl: './organizations-settings.component.html',
  styleUrls: ['./organizations-settings.component.scss']
})
export class OrganizationsSettingsComponent {
  organization: Organization;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organizationService: OrganizationService,
    private messageService: MessageService,
  ) {
    this.route.paramMap.subscribe(params => {
      const organizationId = params.get('organizationId');
      this.organizationService.get(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.organization = data.organization;
      });

      this.organizationService.users(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.users = data.users;
      });
    });
  }

  saveOrganization() {
    this.organizationService.update(this.organization).subscribe(() => {
      this.messageService.log('Updated!');
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteOrganizationComponent, {
      data: { organization: this.organization },
    });
  }
}
