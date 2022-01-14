import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import decode from 'jwt-decode';
import {UserInvitation} from '../../../data/models/userInvitation.model';
import {UserService} from '../../../logic/services/user.service';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent extends BaseComponent implements OnInit {
  invitation: UserInvitation;

  display: boolean;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    const emailToken$ = this.route.paramMap
      .pipe(
        map((params) => params.get('emailToken')),
        tap(emailToken => this.invitation = (decode(emailToken) as any).invitation as UserInvitation),
      );

    emailToken$
      .pipe(
        mergeMap(emailToken => this.userService.validateEmail(emailToken)),
        filter(data => undefined !== data),
      )
      .subscribe(user => {
        this.success = undefined !== user;
        this.display = true;
      })
      .addTo(this.disposeBag);
  }
}
