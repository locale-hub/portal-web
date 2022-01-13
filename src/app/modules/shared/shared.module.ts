import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {AddEntryComponent} from './add-entry/add-entry.component';
import {AddLocaleComponent} from './add-locale/add-locale.component';
import {ArchiveProjectComponent} from './archive-project/archive-project.component';
import {AvatarComponent} from './avatar/avatar.component';
import {CreateAppComponent} from './create-app/create-app.component';
import {CreateCommitComponent} from './create-commit/create-commit.component';
import {CreateOrganizationComponent} from './create-organization/create-organization.component';
import {CreateProjectComponent} from './create-project/create-project.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {DeleteAppComponent} from './delete-app/delete-app.component';
import {DeleteOrganizationComponent} from './delete-organization/delete-organization.component';
import {DeleteProjectComponent} from './delete-project/delete-project.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {GetKeyHistoryComponent} from './get-key-history/get-key-history.component';
import {MatProgressCircleComponent} from './mat-progress-circle/mat-progress-circle.component';
import {ModalComponent} from './modal/modal.component';
import {NotificationCenterComponent} from './notification-center/notification-center.component';
import {PublishCommitComponent} from './publish-commit/publish-commit.component';
import {TranslationEditorComponent} from './translation-editor/translation-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AddEntryComponent,
    AddLocaleComponent,
    ArchiveProjectComponent,
    AvatarComponent,
    CreateAppComponent,
    CreateCommitComponent,
    CreateOrganizationComponent,
    CreateProjectComponent,
    CreateUserComponent,
    DeleteAppComponent,
    DeleteOrganizationComponent,
    DeleteProjectComponent,
    DeleteUserComponent,
    FileUploadComponent,
    GetKeyHistoryComponent,
    MatProgressCircleComponent,
    ModalComponent,
    NotificationCenterComponent,
    PublishCommitComponent,
    TranslationEditorComponent
  ],
  exports: [
    AvatarComponent,
    MatProgressCircleComponent,
    NotificationCenterComponent
  ],
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
