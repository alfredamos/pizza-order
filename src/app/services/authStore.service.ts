import { computed, inject, signal, Injectable } from '@angular/core';
import { AuthState } from '../../models/auth/authState.model';
import { LoginModel } from '../../models/auth/login.model';
import { AuthDbService } from './authDb.service';
import { CartItemStoreService } from './cartItemStore.service';
import { PizzaStoreService } from './pizzaStore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  //----> State
  private authState = signal<AuthState>({ ...new AuthState() });
  stateAuth = this.authState.asReadonly();

  //----> Getters
  isLoggedIn = computed(() => this.stateAuth()?.isLoggedIn);
  isAdmin = computed(() => this.stateAuth()?.isAdmin);
  currentUser = computed(() => this.stateAuth()?.user);
  token = computed(() => this.stateAuth()?.token);

  //----> Needed services
  authDbService = inject(AuthDbService);
  //cartItemStoreService = inject(CartItemStoreService);
  //pizzaStoreService = inject(PizzaStoreService);

  constructor() {
    const stateOfAuth = this.getLocalAuth();

    if (!!stateOfAuth) {
      this.authState.set(stateOfAuth);
    }
  }

  async login(loginModel: LoginModel) {
    const authState = await this.authDbService.login(loginModel);
    console.log('In store, authState : ', authState);
    this.authState.set(authState);
    this.setLocalAuth(authState);
  }

  logout() {
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
}
