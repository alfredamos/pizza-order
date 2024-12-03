import { Component, signal, inject } from '@angular/core';
import { SignupModel } from '../../../models/auth/signup.model';
import { Router } from '@angular/router';
import { SignupFormComponent } from '../../forms/auth/signup-form/signup-form.component';
import { AuthDbService } from '../../services/authDb.service';

@Component({
  selector: 'app-signup',
  imports: [SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  initialSignupInfo = signal<SignupModel>({ ...new SignupModel() });

  authDbService = inject(AuthDbService);
  router = inject(Router);

  backToList() {
    this.router.navigate(['/']);
  }

  async signupSubmit(signupModel: SignupModel) {
    await this.authDbService.signup(signupModel);

    this.router.navigate(['/']);
  }
}
