import {Component, OnInit} from '@angular/core';

import {ManifestService} from '../../../logic/services/manifest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ManifestWithStatus} from '../../../data/models/manifestWithStatus.model';
import {ProjectService} from '../../../logic/services/project.service';
import {Project} from '../../../data/models/project.model';
import {MessageService} from '../../../logic/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {AddLocaleComponent} from '../../shared/add-locale/add-locale.component';
import {AddEntryComponent} from '../../shared/add-entry/add-entry.component';
import {KeyStatus} from '../../../data/enums/keyStatus.enum';
import {CreateCommitComponent} from '../../shared/create-commit/create-commit.component';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-project-i18n',
  templateUrl: './project-i18n.component.html',
  styleUrls: ['./project-i18n.component.scss']
})
export class ProjectI18nComponent extends BaseComponent implements OnInit {
  originalManifest: ManifestWithStatus;
  manifest: ManifestWithStatus;
  project: Project;
  selectedLocale: string;

  changesHasBeenMade = false;

  filterSearchText = '';
  filterShowMissingTranslationOnly = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private projectService: ProjectService,
    private manifestService: ManifestService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        const projectId = params.get('projectId');

        this.projectService
          .get(projectId)
          .subscribe(async (data) => {
            if (undefined === data) {
              return await this.router.navigate(['/']);
            }

            this.project = data.project;
          })
          .addTo(this.disposeBag);

        this.manifestService
          .get(projectId)
          .subscribe(async (data) => {
            if (undefined === data) {
              return await this.router.navigate(['/']);
            }
            const manifest = data.manifest;
            manifest.keys = manifest.keys.sort((a, b) => a.localeCompare(b));

            manifest.locales.forEach((locale: string) => {
              manifest.keys.forEach((key: string) => {
                if (undefined === manifest.manifest[locale][key]) {
                  manifest.manifest[locale][key] = this.defaultEntry(locale, key);
                }
              });
            });

            // stringify/parse operation is to force creation of a new Object.
            this.originalManifest = JSON.parse(JSON.stringify(manifest));
            this.manifest = manifest;
            if (0 !== this.manifest.locales.length) {
              this.selectedLocale = this.manifest.locales[0];
            }
          })
          .addTo(this.disposeBag);
      })
      .addTo(this.disposeBag);
  }

  openAddLocaleDialog(): void {
    this.dialog
      .open(AddLocaleComponent, {
        width: '36vw',
        data: {
          existingLocales: this.manifest.locales,
        }
      })
      .afterClosed()
      .subscribe((res: { locale: string, entries: { [key: string]: string } }) => {
        if (undefined === res || undefined === res.locale) {
          return;
        }

        // If the selected locale does not exist
        if (-1 === this.manifest.locales.indexOf(res.locale)) {
          this.manifest.locales.push(res.locale);
          this.manifest.manifest[res.locale] = {};

          // Add the non existing keys from res.entries to manifest
          for (const key of Object.keys(res.entries ?? {})) {
            if (-1 === this.manifest.keys.indexOf(key)) {
              this.manifest.keys.push(key);
            }
          }

          // Update manifest with the missing key
          for (const locale of this.manifest.locales) {
            for (const key of this.manifest.keys) {
              if (undefined === this.manifest.manifest[locale][key]) {
                this.manifest.manifest[locale][key] = this.defaultEntry(res.locale, key, null, KeyStatus.CREATED);
              }
            }
          }
        }

        // Update the newly added entries with the real value
        for (const key of Object.keys(res.entries ?? {})) {
          this.manifest.manifest[res.locale][key].value = res.entries[key];
        }

        this.selectedLocale = res.locale;
        this.refresh();
      })
      .addTo(this.disposeBag);
  }

  openCommitDialog(): void {
    this.dialog
      .open(CreateCommitComponent, {
        width: '75vw',
        height: '80vh',
        data: {
          project: this.project,
          manifest: this.manifest
        }
      })
      .afterClosed()
      .subscribe((isCommitCreated: boolean) => {
        if (true === isCommitCreated) {
          this.messageService.log('Changes saved');
          window.location.reload();
        }
      })
      .addTo(this.disposeBag);
  }

  openAddEntryDialog(): void {
    this.dialog
      .open(AddEntryComponent)
      .afterClosed()
      .subscribe((newKey: string) => {
        if (undefined === newKey || -1 !== this.manifest.keys.indexOf(newKey)) {
          return;
        }

        this.manifest.keys.push(newKey);
        // Add new key to manifest
        for (const locale of this.manifest.locales) {
          const entry = this.defaultEntry(locale, newKey);
          entry.status = KeyStatus.CREATED;
          this.manifest.manifest[locale][newKey] = entry;
        }
      })
      .addTo(this.disposeBag);
  }

  defaultEntry = (locale: string, key: string, value: string = null, status: KeyStatus = KeyStatus.DEFAULT) => {
    return {
      key,
      locale,
      value,
      translatable: true,
      status
    };
  };

  isLocaleMissAKey = (locale: string): boolean => {
    for (const key of this.manifest.keys) {
      if (false === this.isLocaleKeyValid(locale, key)) {
        return true;
      }
    }
    return false;
  };

  countMissingTranslationForLocale(locale: string) {
    let count = 0;
    for (const key of this.manifest.keys) {
      if (false === this.isLocaleKeyValid(locale, key)) {
        count += 1;
      }
    }
    return count;
  }

  isLocaleKeyValid = (locale: string, key: any) => {
    if (undefined === this.manifest.manifest[locale]
      || undefined === this.manifest.manifest[locale][key]
      || undefined === this.manifest.manifest[locale][key].value) {
      return false;
    }

    if (null === this.manifest.manifest[locale][key]) {
      return false;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[locale][key].status &&
      null === this.manifest.manifest[locale][key].value) {
      return false;
    } else if (KeyStatus.DELETED !== this.manifest.manifest[locale][key].status &&
      0 === this.manifest.manifest[locale][key].value.trim().length) {
      return false;
    }

    return true;
  };

  refresh() {
    for (const locale of this.manifest.locales) {
      for (const key of this.manifest.keys) {
        const entry = this.manifest.manifest[locale][key];
        if (undefined !== entry && undefined !== entry.status && KeyStatus.DEFAULT !== entry.status) {
          this.changesHasBeenMade = true;
          return;
        }
      }
    }

    this.changesHasBeenMade = false;
  }

  deleteLocale(locale: string) {
    const message = `Are you sure you want to delete the locale ${locale}?\n`;
    const deletionIsDesired = confirm(message);
    if (deletionIsDesired) {
      for (const key of this.manifest.keys) {
        this.manifest.manifest[locale][key].status = KeyStatus.DELETED;
      }
      this.changesHasBeenMade = true;
    }
  }

  shouldDisplayTranslationKey(key: string): boolean {
    const inputMatch = '' === this.filterSearchText || key.includes(this.filterSearchText);
    const translationStatusMatch = !this.filterShowMissingTranslationOnly || !this.isLocaleKeyValid(this.selectedLocale, key);
    return inputMatch && translationStatusMatch;
  }
}
