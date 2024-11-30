import { signal, computed } from '@angular/core';
import { UserPayload } from '../../models/auth/userPayload.model';
import { UserState } from '../../models/users/userState.model';

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
      user.id === user.id ? userPayload : user
    );
    this.userState.update((userState) => ({
      ...userState,
      users: newUsers,
    }));
  }
}
