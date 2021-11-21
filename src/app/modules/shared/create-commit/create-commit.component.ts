import {Component, Inject, OnInit} from '@angular/core';
import * as lodash from 'lodash-es';

import {Project} from '../../../data/models/project.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManifestWithStatus} from '../../../data/models/manifestWithStatus.model';
import {KeyStatus} from '../../../data/enums/keyStatus.enum';
import {ManifestEntry} from '../../../data/models/manifestEntry.model';
import {CommitService} from '../../../logic/services/commit.service';

@Component({
  selector: 'app-create-commit',
  templateUrl: './create-commit.component.html',
  styleUrls: ['./create-commit.component.scss']
})
export class CreateCommitComponent implements OnInit {
  project: Project;
  fullManifest: ManifestWithStatus;
  manifest: ManifestWithStatus;
  selectedLocale: string;
  selectedKeys: string[];

  commitTitle: string;
  commitDescription: string;

  constructor(
    private dialogRef: MatDialogRef<CreateCommitComponent>,
    private commitService: CommitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
    this.selectedLocale = this.project.defaultLocale;

    const manifest: ManifestWithStatus = data.manifest;
    const diffManifest: ManifestWithStatus = JSON.parse(JSON.stringify(data.manifest));
    diffManifest.manifest = {};

    for (const locale of manifest.locales) {
      for (const key of manifest.keys) {
        const entry: ManifestEntry = manifest.manifest[locale][key];

        if (undefined !== entry.status && KeyStatus.DEFAULT !== entry.status) {
          if (undefined === diffManifest.manifest[locale]) {
            diffManifest.manifest[locale] = {};
          }
          diffManifest.manifest[locale][key] = entry;
        }
      }

      if (undefined === diffManifest.manifest[locale]) {
        diffManifest.locales = diffManifest.locales.filter((localeName: string) => localeName !== locale);
      }
    }
    this.manifest = diffManifest;
    this.fullManifest = this.getManifestToPublish(JSON.parse(JSON.stringify(data.manifest)));

    this.selectLocale(this.manifest.locales[0]);
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(undefined);
  }

  updateManifest() {
    this.commitService.post(this.project.id, this.fullManifest, this.commitTitle, this.commitDescription)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  isLocaleMissAKey = (locale: string): boolean => {
    if (undefined === this.manifest.manifest[locale]) {
      return false;
    }

    for (const key of this.manifest.keys) {
      if (undefined === this.manifest.manifest[locale][key]) {
        continue;
      }

      if (this.isLocaleKeyValid(locale, key)) {
        return true;
      }
    }
    return false;
  }

  isLocaleKeyValid = (locale: string, key: any) => {
    if (undefined === this.manifest.manifest[locale]
      || undefined === this.manifest.manifest[locale][key]
      || undefined === this.manifest.manifest[locale][key].value) {
      return false;
    }

    if (null === this.manifest.manifest[locale][key]) {
      return true;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[locale][key].status &&
      null === this.manifest.manifest[locale][key].value) {
      return true;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[locale][key].status &&
      0 === this.manifest.manifest[locale][key].value.trim().length) {
      return true;
    }

    return false;
  }

  entryStatus = (locale: string, key: string) => {
    switch (this.manifest.manifest[locale][key].status) {
      case KeyStatus.CREATED:
        return 'entry-created';
      case KeyStatus.EDITED:
        return 'entry-edited';
      case KeyStatus.DELETED:
        return 'entry-deleted';
    }

    return '';
  }

  selectLocale(locale: string) {
    this.selectedKeys = Object.keys(this.manifest.manifest[locale]);
    this.selectedLocale = locale;
  }

  private getManifestToPublish(manifest: ManifestWithStatus): ManifestWithStatus {
    const manifestToPublish: ManifestWithStatus = {
      keys: [],
      locales: [],
      manifest: {},
    };

    for (const locale of manifest.locales) {
      const isDeletedLocale = 0 === Object.keys(manifest.manifest[locale]).filter((key) => {
        return KeyStatus.DELETED !== manifest.manifest[locale][key].status;
      }).length;

      if (isDeletedLocale) {
        continue;
      }

      manifestToPublish.locales.push(locale);
      manifestToPublish.manifest[locale] = {};
      for (const key of manifest.keys) {
        if (KeyStatus.DELETED === manifest.manifest[locale][key].status) {
          continue;
        }
        if (!manifestToPublish.keys.includes(key)) {
          manifestToPublish.keys.push(key);
        }
        manifestToPublish.manifest[locale][key] = manifest.manifest[locale][key];
      }
    }

    return manifestToPublish;
  }
}
