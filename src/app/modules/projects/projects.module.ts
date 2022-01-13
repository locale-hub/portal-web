import {NgModule} from '@angular/core';

import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from './projects.component';
import {ProjectAppsComponent} from './project-apps/project-apps.component';
import {ProjectCommitsDetailsComponent} from './project-commits/project-commits-details/project-commits-details.component';
import {ProjectCommitsComponent} from './project-commits/project-commits.component';
import {ProjectExportsComponent} from './project-exports/project-exports.component';
import {ProjectI18nComponent} from './project-i18n/project-i18n.component';
import {ProjectOverviewComponent} from './project-overview/project-overview.component';
import {ProjectSettingsComponent} from './project-settings/project-settings.component';
import {ProjectUsersComponent} from './project-users/project-users.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslationRowComponent} from './project-i18n/translation-row/translation-row.component';
import {SharedModule} from '../shared/shared.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectAppsComponent,
    ProjectCommitsDetailsComponent,
    ProjectCommitsComponent,
    ProjectExportsComponent,
    ProjectI18nComponent,
    ProjectOverviewComponent,
    ProjectSettingsComponent,
    ProjectUsersComponent,
    TranslationRowComponent
  ],
  imports: [
    ProjectsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    SharedModule,
    ClipboardModule,
    MatTableModule,
  ]
})
export class ProjectsModule {
}
