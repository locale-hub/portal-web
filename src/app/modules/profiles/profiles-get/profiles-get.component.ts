import { Component, OnInit } from '@angular/core';
import {EmailStatus} from '../../../data/enums/EmailStatus.enum';
import {User} from '../../../data/models/user.model';
import {AuthService} from '../../../logic/services/auth.service';
import {UserService} from '../../../logic/services/user.service';
import {MessageService} from '../../../logic/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {Email} from '../../../data/models/email.model';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profiles-get',
  templateUrl: './profiles-get.component.html',
  styleUrls: ['./profiles-get.component.scss']
})
export class ProfilesGetComponent extends BaseComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('userId')),
        mergeMap(userId => this.userService.get(userId)),
        filter(data => undefined !== data),
        map(data => data.user)
      )
      .subscribe(user => { this.user = user; })
      .addTo(this.disposeBag);
  }
}
