import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {App} from '../../../data/models/app.model';
import {AppService} from '../../../logic/services/app.service';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.scss']
})
export class DeleteAppComponent {
  appNameConfirmation: string;
  app: App;

  constructor(
    private dialogRef: MatDialogRef<DeleteAppComponent>,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.app = data.app;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteApp() {
    this.appService.delete(this.app)
      .subscribe((isDeleted) => {
        this.dialogRef.close({
          app: this.app,
          isDeleted
        });
      });
  }
}
