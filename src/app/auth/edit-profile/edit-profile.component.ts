import { Component, signal, inject } from '@angular/core';
import { EditProfileModel } from '../../../models/auth/editProfile.model';
import { AuthDbService } from '../../services/authDb.service';
import { Router } from '@angular/router';
import { EditProfileFormComponent } from '../../forms/auth/edit-profile-form/edit-profile-form.component';
import { AuthStoreService } from '../../services/authStore.service';
import { Gender } from '../../../models/gender.model';

@Component({
  selector: 'app-edit-profile',
  imports: [EditProfileFormComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  authDbService = inject(AuthDbService);
  authStoreService = inject(AuthStoreService);
  router = inject(Router);

  currentUser = this.authStoreService.currentUser;

  initialEditProfile = signal<EditProfileModel>({
    ...new EditProfileModel(),
    name: this.currentUser()?.name,
    email: this.currentUser()?.email,
    phone: this.currentUser()?.phone,
    address: this.currentUser()?.address,
    image: this.currentUser()?.image,
    gender: this.currentUser()?.gender as Gender,
  });

  backToList() {
    this.router.navigate(['/']);
  }

  editProfileSubmit(editProfileModel: EditProfileModel) {
    this.authDbService.editProfile(editProfileModel);

    this.router.navigate(['/']);
  }
}
