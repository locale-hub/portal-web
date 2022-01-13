import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {AuthRoutingModule} from './modules/auth/auth-routing.module';
import {DashboardRoutingModule} from './modules/dashboard/dashboard-routing.module';
import {OrganizationsRoutingModule} from './modules/organizations/organizations-routing.module';
import {ProfilesRoutingModule} from './modules/profiles/profiles-routing.module';
import {ProjectsRoutingModule} from './modules/projects/projects-routing.module';
import {PublicRoutingModule} from './modules/public/public-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
    JwtModule.forRoot(jwtModuleOptions),
    AuthRoutingModule,
    DashboardRoutingModule,
    OrganizationsRoutingModule,
    ProfilesRoutingModule,
    ProjectsRoutingModule,
    PublicRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
