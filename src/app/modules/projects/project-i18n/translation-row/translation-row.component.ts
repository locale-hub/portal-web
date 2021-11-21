import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ManifestWithStatus} from '../../../../data/models/manifestWithStatus.model';
import {Project} from '../../../../data/models/project.model';
import {KeyStatus} from '../../../../data/enums/keyStatus.enum';
import {MatDialog} from '@angular/material/dialog';
import {TranslationEditorComponent} from '../../../shared/translation-editor/translation-editor.component';

@Component({
  selector: 'app-translation-row',
  templateUrl: './translation-row.component.html',
  styleUrls: ['./translation-row.component.scss']
})
export class TranslationRowComponent implements OnInit {
  extended = false;

  @Input() project: Project;
  @Input() manifest: ManifestWithStatus;
  @Input() originalManifest: ManifestWithStatus;
  @Input() key: string;
  @Input() selectedLocale: string;

  @Output() changeHappened: EventEmitter<void> = new EventEmitter();

  statusClass = '';

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.manifest.manifest[this.selectedLocale][this.key].status = this.getStatus();
    this.statusClass = this.entryStatus();
  }

  openTranslationEditor(): void {
    this.dialog.open(TranslationEditorComponent, {
      width: '75vw',
      height: '80vh',
      data: {
        project: this.project,
        manifest: this.manifest.manifest,
        initialEntry: this.originalManifest.manifest[this.selectedLocale]?.[this.key] ?? null,
        entry: this.manifest.manifest[this.selectedLocale][this.key],
        key: this.key,
        locale: this.selectedLocale,
      }
    }).afterClosed().subscribe((response) => {
      if (undefined === response) {
        return;
      }

      if (response.deleted) {
        this.deleteKey();
        return;
      }

      this.manifest.manifest[this.selectedLocale][this.key] = response.updatedEntry;
      this.manifest.manifest[this.selectedLocale][this.key].status = this.getStatus();
      this.statusClass = this.entryStatus();
      this.changeHappened.emit();
    });
  }

  private deleteKey = () => {
    for (const locale of this.manifest.locales) {
      const entry = this.manifest.manifest[locale][this.key];
      if (KeyStatus.CREATED === entry.status) {
        this.manifest.keys = this.manifest.keys.filter((keyName: string) => keyName !== this.key);
        return;
      } else {
        entry.status = KeyStatus.DELETED;
      }
    }
    this.statusClass = this.entryStatus();
  }

  entryStatus = (): string => {
    if (undefined === this.manifest.manifest[this.selectedLocale]
      || undefined === this.manifest.manifest[this.selectedLocale][this.key]
      || undefined === this.manifest.manifest[this.selectedLocale][this.key].value) {
      return '';
    }

    switch (this.manifest.manifest[this.selectedLocale][this.key].status) {
      case KeyStatus.CREATED:
        return 'entry-created';
      case KeyStatus.EDITED:
        return 'entry-edited';
      case KeyStatus.DELETED:
        return 'entry-deleted';
    }

    return '';
  }

  isLocaleKeyValid = (): boolean => {
    if (undefined === this.manifest.manifest[this.selectedLocale]
      || undefined === this.manifest.manifest[this.selectedLocale][this.key]
      || undefined === this.manifest.manifest[this.selectedLocale][this.key].value) {
      return false;
    }

    if (null === this.manifest.manifest[this.selectedLocale][this.key]) {
      return false;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[this.selectedLocale][this.key].status &&
      null === this.manifest.manifest[this.selectedLocale][this.key].value) {
      return false;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[this.selectedLocale][this.key].status &&
      0 === this.manifest.manifest[this.selectedLocale][this.key].value.trim().length) {
      return false;
    }

    return true;
  }

  revertDeleteKey = (): void => {
    for (const locale of this.manifest.locales) {
      this.manifest.manifest[locale][this.key].status = this.getStatus(false);
    }
    this.statusClass = this.entryStatus();
  }

  isDeletedKey = (): boolean => {
    return KeyStatus.DELETED === this.manifest.manifest[this.selectedLocale][this.key].status;
  }

  private getStatus(ignoreDeleted: boolean = true): KeyStatus {
    // TODO: bug - When revert a deletion, the status is not refreshing for other locales (because DataSource)
    let status = KeyStatus.DEFAULT;

    if (undefined === this.originalManifest.manifest[this.selectedLocale] ||
      undefined === this.originalManifest.manifest[this.selectedLocale][this.key]) {
      status = KeyStatus.CREATED;
    } else if (ignoreDeleted && KeyStatus.DELETED === this.manifest.manifest[this.selectedLocale][this.key].status) {
      // IF deleted, then keep this status
      return KeyStatus.DELETED;
    } else if (null === this.originalManifest.manifest[this.selectedLocale][this.key].value &&
      (null === this.manifest.manifest[this.selectedLocale][this.key].value ||
        0 === this.manifest.manifest[this.selectedLocale][this.key].value.trim().length)
    ) {
      status = KeyStatus.DEFAULT;
    } else if (
      this.originalManifest.manifest[this.selectedLocale][this.key].value
      !== this.manifest.manifest[this.selectedLocale][this.key].value) {
      status = KeyStatus.EDITED;
    }

    return status;
  }

  statusMessage(): string {
    const key = this.manifest.manifest[this.selectedLocale][this.key].key;
    switch (this.manifest.manifest[this.selectedLocale][this.key].status) {
      case KeyStatus.DELETED:
        return `'${key}' will be deleted when you commit`;
      case KeyStatus.CREATED:
        return `'${key}' has been created and will be saved when you commit`;
      case KeyStatus.EDITED:
        return `'${key}' has been edited and will be saved when you commit`;
    }
    return '';
  }

  previewText(): string {
    const value = this.manifest.manifest[this.selectedLocale][this.key].value;
    const length = value?.trim().length ?? 0;

    if (96 <= length) {
        return value.slice(0, 93) + '...';
    }
    else if (0 !== length) {
      return value;
    }

    return 'Translation missing';
  }
}
