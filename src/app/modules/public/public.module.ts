import {NgModule} from '@angular/core';

import {PublicRoutingModule} from './public-routing.module';
import {ValidateEmailComponent} from './validate-email/validate-email.component';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ValidateEmailComponent,
  ],
  imports: [
    PublicRoutingModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
  ]
})
export class PublicModule {
}
