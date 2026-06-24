import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  constructor() { }

  onSubmit() {
    console.warn(this.signInForm.value);
  }
}
