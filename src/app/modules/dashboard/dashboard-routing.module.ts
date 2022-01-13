import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AuthGuardService} from '../../logic/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: IndexComponent,
    canActivate: [AuthGuardService],
    data: {
      sectionName: 'index'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
