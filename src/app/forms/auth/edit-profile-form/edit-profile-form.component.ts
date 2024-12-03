import { Component, inject, input, output } from '@angular/core';
import { EditProfileModel } from '../../../../models/auth/editProfile.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.css',
})
export class EditProfileFormComponent {
  currentUser = input.required<EditProfileModel>();
  onEditProfileSubmit = output<EditProfileModel>();
  onBackToList = output<void>();

  fb = inject(FormBuilder);

  editProfileForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required]],
    gender: [''],
  });

  constructor() {}

  ngOnInit(): void {
    this.editProfileForm.patchValue({
      ...this.editProfileForm,
      email: this.currentUser()?.email,
      gender: this.currentUser()?.gender,
      name: this.currentUser()?.name,
      address: this.currentUser()?.address,
      phone: this.currentUser()?.phone,
    });
  }

  editProfileSubmit() {
    const payload = this.editProfileForm.value as EditProfileModel;
    console.log('In edit-profile-form : ', payload);
    this.onEditProfileSubmit.emit(payload);
  }

  backToList() {
    console.log('In edit-profile-form, go back!!!');
    this.onBackToList.emit();
  }
}
