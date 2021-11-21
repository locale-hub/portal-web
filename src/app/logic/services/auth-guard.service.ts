import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    public auth: AuthService,
    public router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
