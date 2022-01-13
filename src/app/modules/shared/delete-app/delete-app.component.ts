import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {App} from '../../../data/models/app.model';
import {AppService} from '../../../logic/services/app.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.scss']
})
export class DeleteAppComponent extends BaseComponent{
  appNameConfirmation: string;
  app: App;

  constructor(
    private dialogRef: MatDialogRef<DeleteAppComponent>,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.app = data.app;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  deleteApp() {
    this.appService
      .delete(this.app)
      .subscribe((isDeleted) => {
        this.dialogRef.close({
          app: this.app,
          isDeleted
        });
      })
      .addTo(this.disposeBag);
  }
}
