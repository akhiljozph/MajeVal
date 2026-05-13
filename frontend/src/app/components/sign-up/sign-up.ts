import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

interface IOption {
  value: string;
  viewValue: string;
  code?: string;
}
@Component({
  selector: 'maj-sign-up',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private readonly cdr = inject(ChangeDetectorRef);

  imagePreview: string | null = null;

  countries: IOption[] = [
    { value: 'IND', viewValue: 'India' },
    { value: 'SLK', viewValue: 'Sri Lanka' },
    { value: 'BAN-2', viewValue: 'Bangladesh' },
  ];

  genders: IOption[] = [
    { value: 'MALE', viewValue: 'Male' },
    { value: 'FEMALE', viewValue: 'Female' },
    { value: 'OTHER', viewValue: 'Others' },
  ];

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
}
