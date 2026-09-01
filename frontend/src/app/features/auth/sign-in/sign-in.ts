import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '@core/services/auth';
import { AuthStateService } from '@core/services/auth-state';

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
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);

  hidePassword = signal(true);

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  togglePasswordVisibility(event: Event) {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    this.authService.accountSignIn(this.signInForm.value).subscribe({
      next: () => {
        this.authState.setAuthenticated(true);
        this.router.navigate(['/app']);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
