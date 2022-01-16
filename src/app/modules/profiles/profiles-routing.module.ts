import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ProfilesSettingsComponent} from './profiles-settings/profiles-settings.component';
import {AuthGuardService} from '../../logic/services/auth-guard.service';
import {ProfilesGetComponent} from './profiles-get/profiles-get.component';

const routes: Routes = [
  {
    path: 'profiles/settings',
    component: ProfilesSettingsComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'profile'
    }
  },
  {
    path: 'profiles/:userId',
    component: ProfilesGetComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'profile'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {
}
