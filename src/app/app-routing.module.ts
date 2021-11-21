import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsProjectsComponent } from './modules/organizations/organizations-projects/organizations-projects.component';
import { ProjectsComponent } from './modules/projects/projects.component';

import { ProjectAppsComponent } from './modules/projects/project-apps/project-apps.component';
import { ProjectCommitsComponent } from './modules/projects/project-commits/project-commits.component';
import { ProjectI18nComponent } from './modules/projects/project-i18n/project-i18n.component';
import { ProjectOverviewComponent } from './modules/projects/project-overview/project-overview.component';
import { ProjectSettingsComponent } from './modules/projects/project-settings/project-settings.component';
import { ProjectUsersComponent } from './modules/projects/project-users/project-users.component';
import {AuthGuardService} from './logic/services/auth-guard.service';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {LoginComponent} from './modules/auth/login/login.component';
import {ProfileComponent} from './modules/profile/profile.component';
import {ProjectExportsComponent} from './modules/projects/project-exports/project-exports.component';
import {OrganizationsComponent} from './modules/organizations/organizations.component';
import {OrganizationsSettingsComponent} from './modules/organizations/organizations-settings/organizations-settings.component';
import {OrganizationsUsersComponent} from './modules/organizations/organizations-users/organizations-users.component';
import {ResetPasswordComponent} from './modules/auth/reset-password/reset-password.component';
import {ResetPasswordApplyComponent} from './modules/auth/reset-password-apply/reset-password-apply.component';
import {ProjectCommitsDetailsComponent} from './modules/projects/project-commits/project-commits-details/project-commits-details.component';
import {ValidateEmailComponent} from './modules/public/validate-email/validate-email.component';
import {IndexComponent} from './modules/dashboard/index/index.component';
import {OrganizationsUsageComponent} from './modules/organizations/organizations-usage/organizations-usage.component';


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
  {
    path: 'validate-email/:emailToken',
    component: ValidateEmailComponent,
    data: {
      sectionName: 'validateEmail'
    }
  },
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: IndexComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'index'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'profile'
    }
  },
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
  {
    path: 'projects/:projectId',
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'projects'
    },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full', data: { subSectionName: 'overview' }  },
      { path: 'apps', component: ProjectAppsComponent, data: { subSectionName: 'apps-list' } },
      { path: 'commits/:commitId', component: ProjectCommitsDetailsComponent, data: { subSectionName: 'commits-details' }  },
      { path: 'commits', component: ProjectCommitsComponent, data: { subSectionName: 'commits-list' }  },
      { path: 'exports', component: ProjectExportsComponent, data: { subSectionName: 'exports' }  },
      { path: 'i18n', component: ProjectI18nComponent, data: { subSectionName: 'translation' }  },
      { path: 'overview', component: ProjectOverviewComponent, data: { subSectionName: 'overview' }  },
      { path: 'settings', component: ProjectSettingsComponent, data: { subSectionName: 'settings' }  },
      { path: 'users', component: ProjectUsersComponent, data: { subSectionName: 'users' }  }
    ]
  }
];

const jwtModuleOptions: JwtModuleOptions = {
  config: {
  }
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'legacy'
    }),
    JwtModule.forRoot(jwtModuleOptions)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
