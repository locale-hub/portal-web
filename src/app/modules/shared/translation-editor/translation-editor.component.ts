import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../data/models/project.model';
import {KeyStatus} from '../../../data/enums/keyStatus.enum';
import {ManifestEntry} from '../../../data/models/manifestEntry.model';
import {GetKeyHistoryComponent} from '../get-key-history/get-key-history.component';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-translation-editor',
  templateUrl: './translation-editor.component.html',
  styleUrls: ['./translation-editor.component.scss']
})
export class TranslationEditorComponent extends BaseComponent implements OnInit {

  project: Project;
  manifest: { [locale: string]: { [key: string]: ManifestEntry } };
  entry: ManifestEntry;
  initialEntry: ManifestEntry;
  key: string;
  locale: string;

  nestedTooltip: string;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<TranslationEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.project = data.project;
    this.manifest = data.manifest;
    this.initialEntry = data.initialEntry;
    this.entry = data.entry;
    this.key = data.key;
    this.locale = data.locale;
  }

  ngOnInit(): void {
    this.nestedTooltip = this.updateTooltip();
  }

  private updateTooltip() {
    const value = this.entry.value;
    if (null === value) {
      return undefined;
    }
    // @ts-ignore
    const allMatches = [...value.matchAll(/{{\s*(\w|\.|-)+\s*}}/gi)]
      .map((match) => match[0].replace(/{{\s*/gi, '').replace(/\s*}}/gi, ''));
    const matches = [...new Set(allMatches)];

    if (0 === matches.length) {
      return '';
    }

    let nestedTooltip = '<span>';
    for (const matchKey of matches) {
      const matchValue = this.get(matchKey);
      if (undefined === matchValue) {
        continue;
      }
      nestedTooltip += `- ${matchKey}: ${matchValue}<br />`;
    }
    nestedTooltip += '</span>';
    return nestedTooltip;
  }

  private get(key: string) {
    return undefined !== this.manifest[this.locale]
      ? undefined !== this.manifest[this.locale][key]
        ? this.manifest[this.locale][key].value
        : undefined
      : undefined;
  }

  deleteKey(): void {
    this.dialogRef.close({
      deleted: true,
    });
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

  save() {
    this.dialogRef.close({
      deleted: false,
      updatedEntry: this.entry,
    });
  }

  resetValue() {
    this.entry.value = this.initialEntry?.value ?? '';
    this.entry.status = KeyStatus.DEFAULT;
  }

  showHistory() {
    const projectId = this.project.id;

    this.dialog
      .open(GetKeyHistoryComponent, {
        data: {
          projectId,
          locale: this.locale,
          key: this.key,
        }
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (undefined === newValue) {
          return;
        }
        this.entry.value = newValue;
        this.entry.status = KeyStatus.EDITED;
      })
      .addTo(this.disposeBag);
  }

  inputChange() {
    this.nestedTooltip = this.updateTooltip();
  }
}
