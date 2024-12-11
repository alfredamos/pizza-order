import { signal, computed, Injectable } from '@angular/core';
import { UserPayload } from '../../models/users/userPayload.model';
import { UserState } from '../../models/users/userState.model';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userState = signal<UserState>({ ...new UserState() });
  stateUser = this.userState.asReadonly();

  users = computed(() => this.stateUser()?.users);

  addUser(user: UserPayload) {
    const newUsers = [...this.userState()?.users, user];
    this.userState.update((userState) => ({
      ...userState,
      users: newUsers,
    }));
  }

  deleteUser(userId: string) {
    const newUsers = this.userState()?.users?.filter(
      (user) => user.id !== userId
    );
    this.userState.update((userState) => ({
      ...userState,
      users: newUsers,
    }));
  }

  editUser(userPayload: UserPayload) {
    const newUsers = this.userState()?.users?.map((user) =>
      user.id === userPayload.id ? userPayload : user
    );
    this.userState.update((userState) => ({
      ...userState,
      users: newUsers,
    }));
  }

  editAllUsers(users: UserPayload[]) {
    this.userState.update((oldUserState) => ({ ...oldUserState, users }));
    this.removeLocalStorageUsers();
    this.setLocalStorageUsers(users);
  }

  setLocalStorageUsers(users: UserPayload[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getLocalStorageUsers() {
    return JSON.parse(localStorage.getItem('users')!) as UserPayload[];
  }

  removeLocalStorageUsers() {
    localStorage.removeItem('users');
  }
}
