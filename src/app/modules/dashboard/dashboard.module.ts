import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {IndexComponent} from './index/index.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class DashboardModule {
}
