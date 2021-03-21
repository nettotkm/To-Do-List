import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

const RESTART_AUTH_PASS = 'TrabalheNaSaipos';

@Directive({
  selector: '[appRestartAuth]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RestartAuthDirective, multi: true }]

})
export class RestartAuthDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return RESTART_AUTH_PASS === control.value ? null : { invalidAuth: true };
  }
}
