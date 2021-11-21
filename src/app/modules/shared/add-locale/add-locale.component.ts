import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Locale} from '../../../data/models/locale.model';
import {LocaleService} from '../../../logic/services/locale.service';
import {ImportFileType} from '../../../data/enums/ImportFileType.enum';
import {parseStringPromise} from 'xml2js';
import FileUtils from '../../../logic/utils/file.util';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-locale',
  templateUrl: './add-locale.component.html',
  styleUrls: ['./add-locale.component.scss']
})
export class AddLocaleComponent implements OnInit {
  selectedLocale: string;

  locales: Locale[];
  myControl = new FormControl();
  filteredLocales: Observable<Locale[]>;

  @ViewChild('fileInput') fileInput;
  file: File;

  constructor(
    private dialogRef: MatDialogRef<AddLocaleComponent>,
    private localeService: LocaleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    const existingLocales = this.data.existingLocales;

    this.localeService.list()
      .subscribe((response) => {
        this.locales = response.locales
          .filter((locale: Locale) => !existingLocales.includes(locale.tag))
          .sort((a: Locale, b: Locale) => a.name.localeCompare(b.name));

        this.filteredLocales = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map((input: string | Locale) => {
              const value = 'object' === typeof input ? input.name.toLowerCase() : input.toLowerCase();
              return this.locales
                .filter(locale => {
                  return locale.name.toLowerCase().includes(value)
                    || locale.tag.toLowerCase().includes(value);
                });
            }),
          );
      });
  }

  close() {
    this.dialogRef.close(undefined);
  }

  async addLocale() {
    if (undefined === this.file) {
      this.dialogRef.close({
        locale: this.selectedLocale,
        entries: null,
      });
      return;
    }

    // TODO: get from file mimetype
    const format: ImportFileType = this.file ? ImportFileType.ANDROID : ImportFileType.JSON;
    switch (format) {
      case ImportFileType.ANDROID:
        await this.processXmlFile();
        break;
      case ImportFileType.JSON:
        await this.processJsonFile();
        break;
      default:
        this.dialogRef.close({
          locale: this.selectedLocale,
          entries: {},
        });
        break;
    }
  }

  async processXmlFile() {
    try {
      const entries: { [key: string]: string } = {};
      const fileContent = await FileUtils.readFile(this.file);
      const result = await parseStringPromise(fileContent);

      result.resources.string.forEach(entry => {
        if (undefined === entry.$.name || 'string' !== typeof entry._) {
          return;
        }
        entries[entry.$.name] = entry._;
      });
      result.resources.plurals.forEach(entry => {
        if (undefined === entry.$.name) {
          return;
        }
        const keyPrefix = entry.$.name;
        entry.item.forEach(item => {
          const keyIdx = 'one' === item.$.quantity ? 'one' : 'many';
          entries[`${keyPrefix}[${keyIdx}]`] = item._;
        });
      });
      result.resources['string-array'].forEach(entry => {
        if (undefined === entry.$.name) {
          return;
        }
        const keyPrefix = entry.$.name;
        entry.item.forEach((item, keyIdx) => {
          entries[`${keyPrefix}[${keyIdx}]`] = item._;
        });
      });

      this.dialogRef.close({
        locale: this.selectedLocale,
        entries
      });
    } catch (error) {
      console.error('Error: ' + JSON.stringify(error, null, 4));
      this.dialogRef.close({
        locale: this.selectedLocale,
        entries: {}
      });
    }
  }

  async processJsonFile() {
    try {
      const entries: { [key: string]: string } = {};
      const fileContent = await FileUtils.readFile(this.file);
      const result = JSON.parse(fileContent);

      for (const key of Object.keys(result)) {
        if ('string' !== typeof result[key]) {
          continue;
        }
        entries[key] = result[key];
      }

      this.dialogRef.close({
        locale: this.selectedLocale,
        entries
      });
    } catch (error) {
      console.error('Error: ' + JSON.stringify(error, null, 4));
      this.dialogRef.close({
        locale: this.selectedLocale,
        entries: {}
      });
    }
  }
}
