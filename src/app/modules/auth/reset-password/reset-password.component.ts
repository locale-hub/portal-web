import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../logic/services/auth.service';
import {MessageService} from '../../../logic/services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  sendResetPasswordRequest() {
    this.authService.resetPasswordRequest(this.email).subscribe((_) => {
      if (undefined !== _) {
        this.messageService.log('You should receive an email soon with instructions.');
      }
    });
  }
}
