import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationsProjectsComponent } from './organizations/organizations-projects/organizations-projects.component';
import { CreateProjectComponent } from './shared/create-project/create-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectAppsComponent } from './projects/project-apps/project-apps.component';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { ProjectI18nComponent } from './projects/project-i18n/project-i18n.component';
import { ProjectCommitsComponent } from './projects/project-commits/project-commits.component';
import { ProjectUsersComponent } from './projects/project-users/project-users.component';
import { ProjectSettingsComponent } from './projects/project-settings/project-settings.component';
import { DeleteProjectComponent } from './shared/delete-project/delete-project.component';
import { ArchiveProjectComponent } from './shared/archive-project/archive-project.component';
import { CreateAppComponent } from './shared/create-app/create-app.component';
import {CreateOrganizationComponent} from './shared/create-organization/create-organization.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DeleteAppComponent } from './shared/delete-app/delete-app.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AddLocaleComponent } from './shared/add-locale/add-locale.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddEntryComponent } from './shared/add-entry/add-entry.component';
import {MatMenuModule} from '@angular/material/menu';
import { CreateCommitComponent } from './shared/create-commit/create-commit.component';
import { LoginComponent } from './auth/login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProfileComponent } from './profile/profile.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { ProjectExportsComponent } from './projects/project-exports/project-exports.component';
import { CreateUserComponent } from './shared/create-user/create-user.component';
import { DeleteUserComponent } from './shared/delete-user/delete-user.component';
import {AppErrorHandler} from '../logic/utils/error-handler.service';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationsUsersComponent } from './organizations/organizations-users/organizations-users.component';
import { OrganizationsSettingsComponent } from './organizations/organizations-settings/organizations-settings.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetPasswordApplyComponent } from './auth/reset-password-apply/reset-password-apply.component';
import { GetKeyHistoryComponent } from './shared/get-key-history/get-key-history.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PublishCommitComponent } from './shared/publish-commit/publish-commit.component';
import { ProjectCommitsDetailsComponent } from './projects/project-commits/project-commits-details/project-commits-details.component';
import { TranslationRowComponent } from './projects/project-i18n/translation-row/translation-row.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeleteOrganizationComponent } from './shared/delete-organization/delete-organization.component';
import { ValidateEmailComponent } from './public/validate-email/validate-email.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { IndexComponent } from './dashboard/index/index.component';
import { OrganizationsUsageComponent } from './organizations/organizations-usage/organizations-usage.component';
import { NotificationCenterComponent } from './shared/notification-center/notification-center.component';
import { ClickOutsideModule } from 'ng-click-outside';
import {MatTabsModule} from '@angular/material/tabs';
import { MatProgressCircleComponent } from './shared/mat-progress-circle/mat-progress-circle.component';
import { TranslationEditorComponent } from './shared/translation-editor/translation-editor.component';
import {DragDropDirective} from '../logic/directives/drag-drop.directive';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    OrganizationsProjectsComponent,
    ProjectAppsComponent,
    ProjectCommitsComponent,
    ProjectI18nComponent,
    ProjectOverviewComponent,
    ProjectUsersComponent,
    ProjectSettingsComponent,
    ProjectsComponent,
    DeleteProjectComponent,
    ArchiveProjectComponent,
    CreateAppComponent,
    DeleteAppComponent,
    AddLocaleComponent,
    AddEntryComponent,
    CreateCommitComponent,
    LoginComponent,
    ProfileComponent,
    ProjectExportsComponent,
    CreateUserComponent,
    DeleteUserComponent,
    OrganizationsComponent,
    OrganizationsUsersComponent,
    OrganizationsSettingsComponent,
    ResetPasswordComponent,
    ResetPasswordApplyComponent,
    GetKeyHistoryComponent,
    PublishCommitComponent,
    ProjectCommitsDetailsComponent,
    TranslationRowComponent,
    DeleteOrganizationComponent,
    ValidateEmailComponent,
    AvatarComponent,
    IndexComponent,
    CreateOrganizationComponent,
    OrganizationsUsageComponent,
    NotificationCenterComponent,
    MatProgressCircleComponent,
    TranslationEditorComponent,
    DragDropDirective,
    FileUploadComponent,
    ModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ClipboardModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ClickOutsideModule,
    MatTabsModule,
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
