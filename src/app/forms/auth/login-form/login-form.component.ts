import { Component, input, output, inject } from '@angular/core';
import { LoginModel } from '../../../../models/auth/login.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  initialLoginInfo = input.required<LoginModel>();
  onLoginSubmit = output<LoginModel>();
  onBackToList = output<void>();

  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    gender: [''],
  });

  loginSubmit() {
    const payload = this.loginForm.value as LoginModel;
    console.log('In edit-profile-form : ', payload);
    this.onLoginSubmit.emit(payload);
  }

  backToList() {
    console.log('In edit-profile-form, go back!!!');
    this.onBackToList.emit();
  }
}
