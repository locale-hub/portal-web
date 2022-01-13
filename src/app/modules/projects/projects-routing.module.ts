import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../../logic/services/auth-guard.service';
import {ProjectsComponent} from './projects.component';
import {ProjectAppsComponent} from './project-apps/project-apps.component';
import {ProjectCommitsDetailsComponent} from './project-commits/project-commits-details/project-commits-details.component';
import {ProjectCommitsComponent} from './project-commits/project-commits.component';
import {ProjectExportsComponent} from './project-exports/project-exports.component';
import {ProjectI18nComponent} from './project-i18n/project-i18n.component';
import {ProjectOverviewComponent} from './project-overview/project-overview.component';
import {ProjectSettingsComponent} from './project-settings/project-settings.component';
import {ProjectUsersComponent} from './project-users/project-users.component';

const routes: Routes = [
  {
    path: 'projects/:projectId',
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'projects'
    },
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full', data: {subSectionName: 'overview'}},
      {path: 'apps', component: ProjectAppsComponent, data: {subSectionName: 'apps-list'}},
      {path: 'commits/:commitId', component: ProjectCommitsDetailsComponent, data: {subSectionName: 'commits-details'}},
      {path: 'commits', component: ProjectCommitsComponent, data: {subSectionName: 'commits-list'}},
      {path: 'exports', component: ProjectExportsComponent, data: {subSectionName: 'exports'}},
      {path: 'i18n', component: ProjectI18nComponent, data: {subSectionName: 'translation'}},
      {path: 'overview', component: ProjectOverviewComponent, data: {subSectionName: 'overview'}},
      {path: 'settings', component: ProjectSettingsComponent, data: {subSectionName: 'settings'}},
      {path: 'users', component: ProjectUsersComponent, data: {subSectionName: 'users'}}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
