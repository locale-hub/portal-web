import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../logic/services/auth.service';
import {User} from '../../../data/models/user.model';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  config = environment;

  name: string;
  email: string;
  password: string;
  password2: string;

  loginInProgress = false;
  registerInProgress = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      await this.router.navigate(['/']);
    }
  }

  register() {
    this.registerInProgress = true;
    this.authService
      .register(this.name, this.email, this.password)
      .subscribe(async (user: User) => {
        this.registerInProgress = false;
        if (undefined === user) {
          return;
        }

        await this.router.navigate(['/']);
      })
      .addTo(this.disposeBag);
  }

  login() {
    this.loginInProgress = true;
    this.authService
      .authenticate(this.email, this.password)
      .subscribe(async (user: User) => {
        this.loginInProgress = false;
        if (undefined === user) {
          return;
        }

        await this.router.navigate(['/']);
      })
      .addTo(this.disposeBag);
  }

}
