import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropDirective} from './directives/drag-drop.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    DragDropDirective,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule
  ]
})
export class ServicesModule {}
