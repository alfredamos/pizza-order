import { computed, inject, signal, Injectable } from '@angular/core';
import { AuthState } from '../../models/auth/authState.model';
import { LoginModel } from '../../models/auth/login.model';
import { AuthDbService } from './authDb.service';
import { LoginResponse } from '../../models/auth/loginResponse.model';
import { UserPayload } from '../../models/users/userPayload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  //----> State
  private authState = signal<AuthState>({ ...new AuthState() });

  //----> Getters
  isLoggedIn = computed(() => this.authState()?.isLoggedIn);
  isAdmin = computed(() => this.authState()?.isAdmin);
  currentUser = computed(() => this.authState()?.currentUser);

  //----> Needed services
  authDbService = inject(AuthDbService);

  constructor() {
    const stateOfAuth = this.getLocalAuth();

    if (!!stateOfAuth) {
      this.authState.set(stateOfAuth);
    }
  }

  editCurrentUser(userPayload: UserPayload){
    this.authState.update(authSt => ({...authSt, currentUser: userPayload}))
    this.setLocalAuth(this.authState())
  }

  async login(loginModel: LoginModel) {
    //----> Get the login user.
    const loginRes = await this.authDbService.login(loginModel);

    //----> Get the authState properties from loginRes.
    const authState = this.modifyInputData(loginRes);

    console.log('In store, authState : ', authState);
    this.authState.set(authState);
    this.setLocalAuth(authState);
  }

  async logout() {
    await this.authDbService.logout()
    this.authState.set(new AuthState());

    this.removeLocalAuth();
  }

  setLocalAuth(authState: AuthState) {
    localStorage.setItem('auth', JSON.stringify(authState));
  }

  getLocalAuth() {
    return JSON.parse(localStorage.getItem('auth')!) as AuthState;
  }

  removeLocalAuth() {
    localStorage.removeItem('auth');
  }

  private modifyInputData(loginRes: LoginResponse){
    const authStateRes: AuthState = {
      id: loginRes?.authResponse?.id,
      image: loginRes?.authResponse?.image,
      isAdmin: loginRes?.authResponse?.isAdmin,
      isLoggedIn: loginRes?.authResponse?.isLoggedIn,
      name: loginRes?.authResponse?.name,
      role: loginRes?.authResponse?.role,
      currentUser: loginRes?.currentUser
    }

    return authStateRes;
  }
}
