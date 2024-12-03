import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SignupModel } from '../../../../models/auth/signup.model';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  initialSignupInfo = input.required<SignupModel>();
  onSignupSubmit = output<SignupModel>();
  onBackToList = output<void>();

  fb = inject(FormBuilder);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    gender: [''],
  });

  constructor() {}

  signupSubmit() {
    const payload = this.signupForm.value as SignupModel;
    console.log('In edit-profile-form : ', payload);
    this.onSignupSubmit.emit(payload);
  }

  backToList() {
    console.log('In edit-profile-form, go back!!!');
    this.onBackToList.emit();
  }
}
