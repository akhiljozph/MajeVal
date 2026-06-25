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

interface IOption {
  value: string;
  viewValue: string;
  code?: string;
}

interface ISignUpModel {
  firstName: string,
  lastName: string,
  country: string,
  mobileNumber: string,
  emailAddress: string,
  gender: string,
  dateOfBirth: string,
  username: string,
  password: string
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
    firstName: '',
    lastName: '',
    country: '',
    mobileNumber: '',
    emailAddress: '',
    gender: '',
    dateOfBirth: '',
    username: '',
    password: ''
  });

  signUpForm = form(this.signUpModel)

  constructor(
    private countryService: CountryService
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
    })
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
    console.log(this.signUpForm().value());
  }
}
