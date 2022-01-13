import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mat-progress-circle',
  templateUrl: './mat-progress-circle.component.html',
  styleUrls: ['./mat-progress-circle.component.scss']
})
export class MatProgressCircleComponent implements OnInit {

  @Input() value: number;
  @Input() displayText = false;

  constructor() {
  }

  ngOnInit(): void {
    this.value = parseInt(this.value.toFixed(0), 10);
  }

}
