import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  static instance: MessageService;

  messages: string[] = [];
  isDisplaying = false;

  constructor(
    private snackBar: MatSnackBar
  ) {
    MessageService.instance = this;
  }

  log(message: string) {
    this.messages.push(message);

    if (this.isDisplaying) {
      return;
    }

    this.showNextMessage();
  }

  showNextMessage() {
    const message = this.messages.shift();
    this.isDisplaying = true;
    this.snackBar.open(message, 'dismiss', {
      duration: 4 * 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [ 'mat-snackbar-margin-top' ]
    }).afterDismissed().subscribe(() => {
      this.isDisplaying = false;

      if (0 === this.messages.length) {
        return;
      }

      this.showNextMessage();
    });
  }

  clear() {
    this.messages = [];
  }
}
