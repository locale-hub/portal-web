import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ResetPasswordApplyComponent} from './reset-password-apply/reset-password-apply.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      sectionName: 'auth'
    }
  },
  {
    path: 'password-reset',
    component: ResetPasswordComponent,
    data: {
      sectionName: 'auth'
    }
  },
  {
    path: 'password-reset/:token',
    component: ResetPasswordApplyComponent,
    data: {
      sectionName: 'auth'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
