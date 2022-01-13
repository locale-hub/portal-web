import {NgModule} from '@angular/core';

import {ProfilesRoutingModule} from './profiles-routing.module';
import {ProfileComponent} from './details/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfilesRoutingModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class ProfilesModule {}
