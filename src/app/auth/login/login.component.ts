import { AuthStoreService } from '../../services/authStore.service';
import { Component, signal, inject } from '@angular/core';
import { LoginFormComponent } from '../../forms/auth/login-form/login-form.component';
import { LoginModel } from '../../../models/auth/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  initialLoginInfo = signal<LoginModel>({ ...new LoginModel() });

  authStoreService = inject(AuthStoreService);
  router = inject(Router);

  backToList() {
    this.router.navigate(['/']);
  }

  async loginSubmit(loginModel: LoginModel) {
    await this.authStoreService.login(loginModel);

    this.router.navigate(['/']);
  }
}
