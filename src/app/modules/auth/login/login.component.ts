import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../logic/services/auth.service';
import {User} from '../../../data/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../logic/services/message.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  config = environment;

  name: string;
  email: string;
  password: string;
  password2: string;

  loginInProgress = false;
  registerInProgress = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      await this.router.navigate(['/']);
    }
  }

  register() {
    this.registerInProgress = true;
    this.authService.register(this.name, this.email, this.password)
      .subscribe(async (user: User) => {
        this.registerInProgress = false;
        if (undefined === user) {
          return;
        }

        await this.router.navigate(['/']);
      });
  }

  login() {
    this.loginInProgress = true;
    this.authService.authenticate(this.email, this.password)
      .subscribe(async (user: User) => {
        this.loginInProgress = false;
        if (undefined === user) {
          return;
        }

        await this.router.navigate(['/']);
      });
  }

}
