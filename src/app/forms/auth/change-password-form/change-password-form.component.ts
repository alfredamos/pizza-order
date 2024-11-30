import { Component, inject, input, OnInit, output } from '@angular/core';
import { ChangePasswordModel } from '../../../../models/auth/changePassword.model';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-change-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css',
})
export class ChangePasswordFormComponent implements OnInit {
  initialChangePasswordInfo = input.required<ChangePasswordModel>();

  onBackToList = output<void>();
  onSubmit = output<ChangePasswordModel>();

  fb = inject(FormBuilder);

  changePasswordForm = this.fb.group({
    email: ["",[Validators.required, Validators.email]],
    confirmPassword: ["", [Validators.required]],
    newPassword: ["", [Validators.required]],
    oldPassword: ["", [Validators.required]],
  })

  ngOnInit(){
    this.changePasswordForm.patchValue({
      email: this.initialChangePasswordInfo().email,
      confirmPassword: this.initialChangePasswordInfo().confirmPassword,
      newPassword: this.initialChangePasswordInfo().newPassword,
      oldPassword: this.initialChangePasswordInfo().oldPassword,
    });
  }

  changePasswordSubmit(){
    this.onSubmit.emit(this.changePasswordForm.value as ChangePasswordModel);
  }

  backToList(){
    this.onBackToList.emit();
  }
}
