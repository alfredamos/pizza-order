import { Component, signal, inject } from '@angular/core';
import { SignupModel } from '../../../models/auth/signup.model';
import { AuthStoreService } from '../../services/authStore.service';
import { Router } from '@angular/router';
import { SignupFormComponent } from '../../forms/auth/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  imports: [SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  initialSignupInfo = signal<SignupModel>({ ...new SignupModel() });

  authStoreService = inject(AuthStoreService);
  router = inject(Router);

  backToList() {
    this.router.navigate(['/pizzas']);
  }

  signupSubmit(signupModel: SignupModel) {
    this.authStoreService.login(signupModel);

    this.router.navigate(['/pizzas']);
  }
}
