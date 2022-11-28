import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../types/user';
import { Subject, take, takeUntil } from 'rxjs';

export interface RegistrationForm {
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordClone: FormControl<string>;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnDestroy {

  form = new FormGroup<RegistrationForm>({
    firstName: new FormControl('', {nonNullable: true, validators: Validators.required}),
    middleName: new FormControl('', {nonNullable: true}),
    lastName: new FormControl('', {nonNullable: true, validators: Validators.required}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: Validators.required}),
    passwordClone: new FormControl('', {nonNullable: true, validators: Validators.required})
  });

  private destroy$ = new Subject<void>();

  constructor(private readonly authService: AuthService) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.registration(this.prepareValue()).pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(({jwt}) => {
        localStorage.setItem('token', jwt);
        location.reload();
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private prepareValue(): UserDTO {
    const formValue = this.form.getRawValue();
    return {
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      middleName: formValue.middleName,
      password: formValue.password,
      username: formValue.email
    }
  }

}
