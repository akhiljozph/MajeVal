import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'maj-sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sign-in.scss',
})
export class SignIn {
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
  ) { }

  onSubmit() {
    this.authService.accountSignIn(this.signInForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }
}
