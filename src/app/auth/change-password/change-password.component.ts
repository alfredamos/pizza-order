import { Component, inject, signal } from '@angular/core';
import { ChangePasswordFormComponent } from '../../forms/auth/change-password-form/change-password-form.component';
import { Router } from '@angular/router';
import { AuthDbService } from '../../services/authDb.service';
import { ChangePasswordModel } from '../../../models/auth/changePassword.model';

@Component({
  selector: 'app-change-password',
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  initialChangePassword = signal({
    ...new ChangePasswordModel(),
  });

  authDbService = inject(AuthDbService)
  router = inject(Router);

  backToList(){
    this.router.navigate(["/"])
  }

  changePasswordSubmit(changePassword: ChangePasswordModel){
    this.authDbService.changePassword(changePassword);

    this.router.navigate(["/"])
  }
}
