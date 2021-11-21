import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {App} from '../../../data/models/app.model';
import {AppService} from '../../../logic/services/app.service';
import {AppType} from '../../../data/enums/AppType.enum';
import {MessageService} from '../../../logic/services/message.service';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss'],
})
export class CreateAppComponent {
  private projectId: string;
  types = AppType;
  app: App = {
    createdAt: '',
    id: '',
    projectId: '',
    type: '',
    identifier: '',
    name: '',
    key: ''
  };

  appTypes: string[] = [...Object.values(AppType)];

  constructor(
    private dialogRef: MatDialogRef<CreateAppComponent>,
    private appService: AppService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  create() {
    this.appService.create(this.projectId, this.app)
      .subscribe((data) => {
        this.messageService.log(`Project ${data.application.name} created!`);
        this.dialogRef.close(data.application);
      });
  }
}
