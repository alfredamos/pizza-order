import { Component, signal, inject } from '@angular/core';
import { EditProfileModel } from '../../../models/auth/editProfile.model';
import { AuthDbService } from '../../services/authDb.service';
import { Router } from '@angular/router';
import { EditProfileFormComponent } from '../../forms/auth/edit-profile-form/edit-profile-form.component';
import { ChangePasswordFormComponent } from "../../forms/auth/change-password-form/change-password-form.component";

@Component({
  selector: 'app-edit-profile',
  imports: [EditProfileFormComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  initialEditProfile = signal<EditProfileModel>({ ...new EditProfileModel() });

  authDbService = inject(AuthDbService);
  router = inject(Router);

  backToList() {
    this.router.navigate(['/']);
  }

  editProfileSubmit(editProfileModel: EditProfileModel) {
    this.authDbService.editProfile(editProfileModel);

    this.router.navigate(['/']);
  }
}
