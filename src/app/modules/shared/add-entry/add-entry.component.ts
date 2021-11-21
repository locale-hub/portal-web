import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  keyName: string;

  constructor(
    private dialogRef: MatDialogRef<AddEntryComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  addKey() {
    this.dialogRef.close(this.keyName);
  }

  close() {
    this.dialogRef.close(undefined);
  }
}
