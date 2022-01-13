import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() accept: string;

  @Input() file: File;
  @Output() fileChange = new EventEmitter<File>();

  uploadFile(files: File[]) {
    this.file = files[0];
    this.fileChange.emit(this.file);
  }

  deleteFile() {
    this.file = undefined;
  }
}
