import { inject,Injectable, Injector, Signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthState } from "../../models/auth/authState.model";
import { EditProfileModel } from '../../models/auth/editProfile.model';
import { LoginModel } from '../../models/auth/login.model';
import { SignupModel } from '../../models/auth/signup.model';
import { ChangePasswordModel } from "../../models/auth/changePassword.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthDbService {
  baseUrl = 'http://localhost:5000/api/auth';

  http = inject(HttpClient);

  async changePassword(changePasswordModel: ChangePasswordModel) {
    const url = `${this.baseUrl}/change-password`;
    const response$ = this.http.patch<AuthState>(url, changePasswordModel);
    const response = await firstValueFrom(response$);

    return response;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    const url = `${this.baseUrl}/edit-profile`;
    const response$ = this.http.patch<AuthState>(url, editProfileModel);
    const response = await firstValueFrom(response$);

    return response;
  }

  async login(loginModel: LoginModel) {
    const url = `${this.baseUrl}/login`;
    console.log({url})
    const response$ = this.http.post<AuthState>(url, loginModel);
    const response = await firstValueFrom(response$)
    
    return response;
  }

  async signup(signupModel: SignupModel) {
    const url = `${this.baseUrl}/signup`;
    const response$ = this.http.post<AuthState>(url, signupModel);
    const response = await firstValueFrom(response$);

    return response;
  }
}