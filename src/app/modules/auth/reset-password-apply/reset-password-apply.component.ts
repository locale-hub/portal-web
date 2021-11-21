import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../logic/services/auth.service';
import {MessageService} from '../../../logic/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password-apply',
  templateUrl: './reset-password-apply.component.html',
  styleUrls: ['./reset-password-apply.component.scss']
})
export class ResetPasswordApplyComponent implements OnInit {
  token: string;
  email: string;
  password1: string;
  password2: string;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  sendResetPasswordApply() {
    if (this.password1 !== this.password2) {
      this.messageService.log('Passwords does not match!');
      return;
    }

    this.authService.resetPasswordApply(this.token, this.email, this.password1).subscribe(async (_) => {
      if (undefined === _) {
        return;
      }

      this.messageService.log('Password has been with success!');
      await this.router.navigate(['/']);
    });
  }
}
