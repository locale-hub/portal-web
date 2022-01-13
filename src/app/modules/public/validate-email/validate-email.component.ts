import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import decode from 'jwt-decode';
import {UserInvitation} from '../../../data/models/userInvitation.model';
import {UserService} from '../../../logic/services/user.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent extends BaseComponent {

  token: string;
  invitation: UserInvitation;

  display: boolean;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    super();
    this.route.paramMap
      .subscribe(params => {
        this.token = params.get('emailToken');
        this.invitation = (decode(this.token) as any).invitation as UserInvitation;

        this.userService
          .validateEmail(this.token)
          .subscribe((user) => {
            this.success = undefined !== user;
            this.display = true;
          })
          .addTo(this.disposeBag);
      })
      .addTo(this.disposeBag);
  }
}
