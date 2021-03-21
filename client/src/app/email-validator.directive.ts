import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { EmailService } from './services/email.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements AsyncValidator {
  constructor(private emailService: EmailService) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailService.validate(ctrl.value).pipe(
      tap(response => (this.emailService.response = response)),
      map(response => (response.format_valid ? { invalidFormat: false, didYouMean: response.did_you_mean } : { invalidFormat: true })),
      catchError(() => {
        return of(null)
      })
    );
  }
}
