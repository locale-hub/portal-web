import {Component, OnInit} from '@angular/core';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {CreateUserComponent} from '../../shared/create-user/create-user.component';
import {DeleteUserComponent} from '../../shared/delete-user/delete-user.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../logic/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../helpers/BaseComponent';

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
    this.route.paramMap
      .subscribe(params => {
        this.organizationId = params.get('organizationId');
        this.organizationService
          .get(this.organizationId)
          .subscribe(async (data) => {
            if (undefined === data) {
              return await this.router.navigate(['/']);
            }

            const user = this.authService.user();
            this.isUserOwner = user.id === data.organization.owner;
          })
          .addTo(this.disposeBag);

        this.organizationService
          .users(this.organizationId)
          .subscribe(async (data) => {
            if (undefined === data) {
              return await this.router.navigate(['/']);
            }
            this.users = data.users;
          })
          .addTo(this.disposeBag);
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
