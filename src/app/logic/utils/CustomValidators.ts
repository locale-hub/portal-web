import {AbstractControl, ValidationErrors} from '@angular/forms';

export default class CustomValidators {

  /**
   * Check that the given FormControl field have the same value as the given matchTo parameter
   * @param matchTo: name of the control to match to
   */
  static matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
    };
  }

  /**
   * Check that the given FormControl field have the same value as the given matchTo parameter
   */
  static validStripeCard(cardElement: HTMLElement | null): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      null == cardElement &&
      cardElement?.classList.contains('StripeElement--complete')
        ? null
        : {isValid: false};
    };
  }



}
