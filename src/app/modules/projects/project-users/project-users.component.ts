import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../data/models/user.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {MessageService} from '../../../logic/services/message.service';
import {ProjectService} from '../../../logic/services/project.service';
import {Project} from '../../../data/models/project.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DeleteUserComponent} from '../../shared/delete-user/delete-user.component';
import {AuthService} from '../../../logic/services/auth.service';
import {UserRoles} from '../../../data/enums/UserRoles.enum';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent extends BaseComponent implements OnInit {
  projectId: string;
  project: Project;
  organizationUsers: User[];
  users: User[] = [];
  userEmailToAdd: string;

  isUserAdmin: boolean;

  myControl = new FormControl();
  filteredUsers: Observable<User[]>;

  constructor(
    private organizationsService: OrganizationService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.projectId = params.get('projectId');
        this.projectService
          .get(this.projectId)
          .subscribe(async (data) => {
            if (undefined === data) {
              return await this.router.navigate(['/']);
            }

            this.project = data.project;

            this.organizationsService
              .users(this.project.organizationId)
              .subscribe(async (userData) => {
                if (undefined === userData) {
                  return await this.router.navigate(['/']);
                }
                this.organizationUsers = userData.users;
                const authUserRole = this.organizationUsers
                  .filter((u) => u.id = this.authService.user().id)[0]
                  .role;
                this.isUserAdmin = UserRoles.OWNER === authUserRole || UserRoles.ADMIN === authUserRole;

                this.filteredUsers = this.myControl.valueChanges
                  .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                  );
              })
              .addTo(this.disposeBag);
          })
          .addTo(this.disposeBag);

        this.projectService
          .getUsers(this.projectId)
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

  public inviteUser() {
    const userId = this.organizationUsers.filter(u => u.primaryEmail === this.userEmailToAdd)[0].id;
    this.projectService.addUser(this.projectId, userId).subscribe(() => {
      this.userEmailToAdd = '';
      this.ngOnInit();
    });
  }

  inputExistsAsUserEmail() {
    return this.organizationUsers
      && 0 === this.organizationUsers.filter(u => u.primaryEmail === this.userEmailToAdd).length;
  }

  refresh() {
    this.ngOnInit();
  }

  openDeleteUser(user: User) {
    this.dialog
      .open(DeleteUserComponent, {
        data: {
          userId: user.id,
          userName: user.name
        }
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      })
      .addTo(this.disposeBag);
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.organizationUsers
      .filter(user => {
        return (0 === this.users.filter(u => u.primaryEmail === user.primaryEmail).length)
          && (user.primaryEmail.toLowerCase().includes(filterValue) || user.name.toLowerCase().includes(filterValue));
      });
  }
}
