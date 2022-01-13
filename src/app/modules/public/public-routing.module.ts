import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ValidateEmailComponent} from './validate-email/validate-email.component';

const routes: Routes = [
  {
    path: 'validate-email/:emailToken',
    component: ValidateEmailComponent,
    data: {
      sectionName: 'validateEmail'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
