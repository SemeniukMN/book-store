import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subject, take, takeUntil } from 'rxjs';

export interface LoginForm {
  identifier: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

  form = new FormGroup<LoginForm>({
    identifier: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: Validators.required}),
  });

  private destroy$ = new Subject<void>();

  constructor(private readonly authService: AuthService) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).pipe(
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

}
