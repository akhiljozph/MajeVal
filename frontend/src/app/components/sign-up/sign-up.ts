import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { form, FormField } from '@angular/forms/signals';

import { IBaseResponse } from '../../core/interfaces/base-response';
import { ICountry } from '../../core/interfaces/country';
import { CountryService } from '../../core/services/country';
import { AuthService } from '../../core/services/auth';

interface IOption {
  value: string;
  viewValue: string;
  code?: string;
}

interface ISignUpModel {
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  country: string,
  mobileNumber: string,
  profilePicture: string,
  role: string,
  dateOfBirth: string,
  username: string,
  password: string,
  gender: string
}
@Component({
  selector: 'maj-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    FormField
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  imagePreview: string | null = null;

  countries: IOption[] = [];

  genders: IOption[] = [
    { value: 'MALE', viewValue: 'Male' },
    { value: 'FEMALE', viewValue: 'Female' },
    { value: 'OTHER', viewValue: 'Others' },
  ];

  signUpModel = signal<ISignUpModel>({
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "email": "",
    "country": "",
    "mobileNumber": "",
    "profilePicture": "",
    "role": "",
    "dateOfBirth": "",
    "username": "",
    "password": "",
    "gender": ""
  });

  signUpForm = form(this.signUpModel)

  constructor(
    private countryService: CountryService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.countryService.getCountry().subscribe({
      next: (response: IBaseResponse<ICountry[]>) => {
        this.countries = response?.data.map((country: any) => {
          return {
            code: country?.countryCode,
            value: country?.code,
            viewValue: country?.countryName
          }
        });
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    const accountData = this.signUpForm().value();
    this.authService.accountSignUp(accountData).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    });
  }
}
