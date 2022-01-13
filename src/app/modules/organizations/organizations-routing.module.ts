import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from '../../logic/services/auth-guard.service';
import {OrganizationsComponent} from './organizations.component';
import {OrganizationsProjectsComponent} from './organizations-projects/organizations-projects.component';
import {OrganizationsUsageComponent} from './organizations-usage/organizations-usage.component';
import {OrganizationsSettingsComponent} from './organizations-settings/organizations-settings.component';
import {OrganizationsUsersComponent} from './organizations-users/organizations-users.component';

const routes: Routes = [
  {
    path: 'organizations/:organizationId',
    component: OrganizationsComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'organizations'
    },
    children: [
      { path: '',   redirectTo: 'projects', pathMatch: 'full', data: { subSectionName: 'projects' }  },
      { path: 'projects', component: OrganizationsProjectsComponent, data: { subSectionName: 'projects' }  },
      { path: 'usage', component: OrganizationsUsageComponent, data: { subSectionName: 'usage' }  },
      { path: 'settings', component: OrganizationsSettingsComponent, data: { subSectionName: 'settings' }  },
      { path: 'users', component: OrganizationsUsersComponent, data: { subSectionName: 'users' }  }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
