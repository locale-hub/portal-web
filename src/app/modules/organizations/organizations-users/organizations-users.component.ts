import {Component, OnInit} from '@angular/core';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {CreateUserComponent} from '../../shared/create-user/create-user.component';
import {DeleteUserComponent} from '../../shared/delete-user/delete-user.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../logic/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-users',
  templateUrl: './organizations-users.component.html',
  styleUrls: ['./organizations-users.component.scss']
})
export class OrganizationsUsersComponent extends BaseComponent implements OnInit {
  organizationId: string;
  users: User[];
  isUserOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private organizationService: OrganizationService,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    const organizationId$ = this.route.paramMap
      .pipe(
        map((params) => params.get('organizationId')),
        tap(organizationId => this.organizationId = organizationId),
      );

    organizationId$
      .pipe(
        mergeMap(organizationId => this.organizationService.get(organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        const user = this.authService.user();
        this.isUserOwner = user.id === data.organization.owner;
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

  public openInviteUser() {
    this.dialog.open(CreateUserComponent, {
      data: {
        organizationId: this.organizationId,
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  refresh() {
    this.ngOnInit();
  }

  openDeleteUser(user: User) {
    this.dialog.open(DeleteUserComponent, {
      data: {
        userId: user.id,
        userName: user.name
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
