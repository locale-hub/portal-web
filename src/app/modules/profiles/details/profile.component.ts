import {Component, OnInit} from '@angular/core';
import {User} from '../../../data/models/user.model';
import {AuthService} from '../../../logic/services/auth.service';
import {UserService} from '../../../logic/services/user.service';
import {MessageService} from '../../../logic/services/message.service';
import {Email} from '../../../data/models/email.model';
import {EmailStatus} from '../../../data/enums/EmailStatus.enum';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  private readonly emailRegex = new RegExp(
    '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
  );

  emailStatus = EmailStatus;
  user: User;
  password: { old: string, new1: string, new2: string } = {
    old: '',
    new1: '',
    new2: ''
  };
  newEmail: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  updateUser() {
    this.userService
      .update(this.user)
      .subscribe(() => {
        this.ngOnInit();
        this.messageService.log('Information saved');
      })
      .addTo(this.disposeBag);
  }

  updateUserPassword() {
    if (this.passwordsDoesNotMatches()) {
      this.messageService.log(`New password does not match or is empty`);
      return;
    }

    this.userService
      .updatePassword(this.password.old, this.password.new1)
      .subscribe(() => {
        this.messageService.log('Password updated');
      })
      .addTo(this.disposeBag);
  }

  private passwordsDoesNotMatches(): boolean {
    return 0 === this.password.new1.trim().length ||
      0 === this.password.new2.trim().length ||
      this.password.new1 !== this.password.new2;
  }

  addEmail() {
    this.user.emails.push({
      email: this.newEmail,
      status: EmailStatus.PENDING,
      createdAt: '',
    });
    this.userService
      .update(this.user)
      .subscribe((updated) => {
        if (undefined !== updated) {
          this.messageService.log('Please check your emails');
        }

        this.ngOnInit();
      })
      .addTo(this.disposeBag);
  }

  deleteEmail(email: Email) {
    const deletionConfirmed = confirm(
      `Are you sure you want to delete ${email.email}?\n` +
      'You will loose access to all related projects.'
    );

    if (deletionConfirmed) {
      this.user.emails = this.user.emails.filter((e) => e.email !== email.email);
      this.userService
        .update(this.user)
        .subscribe(() => {
          this.ngOnInit();
          this.messageService.log('Email removed');
        })
        .addTo(this.disposeBag);
    }
  }

  invalidEmail(): boolean {
    return undefined === this.newEmail
      || null === this.newEmail
      || 0 === this.newEmail.trim().length
      || !this.emailRegex.test(this.newEmail);
  }
}
