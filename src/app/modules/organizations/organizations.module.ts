import {NgModule} from '@angular/core';

import {OrganizationsRoutingModule} from './organizations-routing.module';
import {OrganizationsComponent} from './organizations.component';
import {OrganizationsProjectsComponent} from './organizations-projects/organizations-projects.component';
import {OrganizationsUsageComponent} from './organizations-usage/organizations-usage.component';
import {OrganizationsSettingsComponent} from './organizations-settings/organizations-settings.component';
import {OrganizationsUsersComponent} from './organizations-users/organizations-users.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '../shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    OrganizationsComponent,
    OrganizationsProjectsComponent,
    OrganizationsUsageComponent,
    OrganizationsSettingsComponent,
    OrganizationsUsersComponent,
  ],
  imports: [
    OrganizationsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    SharedModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class OrganizationsModule {}
