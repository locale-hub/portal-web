import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppErrorHandler} from './logic/utils/error-handler.service';
import {AuthModule} from './modules/auth/auth.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {OrganizationsModule} from './modules/organizations/organizations.module';
import {ProfilesModule} from './modules/profiles/profiles.module';
import {ProjectsModule} from './modules/projects/projects.module';
import {PublicModule} from './modules/public/public.module';
import {SharedModule} from './modules/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ServicesModule} from './logic/services.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    OrganizationsModule,
    ProfilesModule,
    ProjectsModule,
    PublicModule,
    ServicesModule,
    SharedModule,

    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [
    HttpClientModule,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
