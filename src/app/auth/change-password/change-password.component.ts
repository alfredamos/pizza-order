import { Component, inject, signal } from '@angular/core';
import { ChangePasswordFormComponent } from '../../forms/auth/change-password-form/change-password-form.component';
import { Router } from '@angular/router';
import { AuthDbService } from '../../services/authDb.service';
import { AuthStoreService } from '../../services/authStore.service';
import { ChangePasswordModel } from '../../../models/auth/changePassword.model';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-change-password',
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  authDbService = inject(AuthDbService);
  authStoreService = inject(AuthStoreService);
  router = inject(Router);
  toast = inject(HotToastService);

  currentUser = this.authStoreService.currentUser;

  initialChangePassword = signal({
    ...new ChangePasswordModel(),
    email: this.currentUser()?.email,
  });

  backToList() {
    this.router.navigate(['/']);
  }

  async changePasswordSubmit(changePassword: ChangePasswordModel) {
    await this.authDbService.changePassword(changePassword);

    this.toast.success("Password change is successful!");

    this.router.navigate(['/']);
  }
}
