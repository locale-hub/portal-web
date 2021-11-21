import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../../data/models/project.model';
import {Manifest} from '../../../data/models/manifest.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManifestService} from '../../../logic/services/manifest.service';
import * as lodash from 'lodash-es';
import {ManifestEntry} from '../../../data/models/manifestEntry.model';
import {KeyStatus} from '../../../data/enums/keyStatus.enum';
import {HistoryEntry} from '../../../data/models/historyEntry.model';
import * as moment from 'moment';

@Component({
  selector: 'app-get-key-history',
  templateUrl: './get-key-history.component.html',
  styleUrls: ['./get-key-history.component.scss']
})
export class GetKeyHistoryComponent implements OnInit {
  projectId: string;
  locale: string;
  key: string;

  history: HistoryEntry[];

  constructor(
    private dialogRef: MatDialogRef<GetKeyHistoryComponent>,
    private manifestService: ManifestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
    this.locale = data.locale;
    this.key = data.key;
  }

  ngOnInit(): void {
    this.manifestService
      .getHistory(this.projectId, this.key, this.locale)
      .subscribe((data) => this.history = data.history);
  }

  formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  selectValue(value: any) {
    this.dialogRef.close(value);
  }
}
