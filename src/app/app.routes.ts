import { Routes } from '@angular/router';
import { protectedGuard } from '../guard/protected.guard';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MustLoginComponent } from './auth/must-login/must-login.component';
import { NotAllowedComponent } from './auth/not-allowed/not-allowed.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SomethingWrongComponent } from './auth/something-wrong/something-wrong.component';

export const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [protectedGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'must-login', component: MustLoginComponent },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: 'something-wrong', component: SomethingWrongComponent },
  { path: 'signup', component: SignupComponent },
];
