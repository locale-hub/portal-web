import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../logic/services/organization.service';
import {User} from '../../../data/models/user.model';
import {Organization} from '../../../data/models/organization.model';
import {MessageService} from '../../../logic/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteOrganizationComponent} from '../../shared/delete-organization/delete-organization.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-settings',
  templateUrl: './organizations-settings.component.html',
  styleUrls: ['./organizations-settings.component.scss']
})
export class OrganizationsSettingsComponent extends BaseComponent implements OnInit {
  organization: Organization;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organizationService: OrganizationService,
    private messageService: MessageService,
  ) {
    super();
  }

  ngOnInit(): void {
    const organizationId$ = this.route.paramMap
      .pipe(
        map((params) => params.get('organizationId')),
      );

    organizationId$
      .pipe(
        mergeMap(organizationId => this.organizationService.get(organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.organization = data.organization;
      })
      .addTo(this.disposeBag);

    organizationId$
      .pipe(
        mergeMap(organizationId => this.organizationService.users(organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.users = data.users;
      })
      .addTo(this.disposeBag);
  }

  saveOrganization() {
    this.organizationService
      .update(this.organization)
      .subscribe(() => {
        this.messageService.log('Updated!');
      })
      .addTo(this.disposeBag);
  }

  openDeleteDialog() {
    this.dialog.open(DeleteOrganizationComponent, {
      data: {organization: this.organization},
    });
  }
}
