import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'maj-sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sign-in.scss',
})
export class SignIn {

  private router = inject(Router);

  hidePassword = signal(true);

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService
  ) { }

  togglePasswordVisibility(event: any) {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    this.authService.accountSignIn(this.signInForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err) => {
        this.router.navigate(['/app']);
        console.error(err.message);
      }
    });
  }
}
