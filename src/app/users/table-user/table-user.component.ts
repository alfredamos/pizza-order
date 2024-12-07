import { Component, inject, signal } from '@angular/core';
import { UserStoreService } from '../../services/userStore.service';
import { DeleteViewButtonsUserTableComponent } from '../delete-view-buttons-user-table/delete-view-buttons-user-table.component';
import { UserDbService } from '../../services/user.service';
import { UserPayload } from '../../../models/auth/userPayload.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-user',
  imports: [FormsModule, DeleteViewButtonsUserTableComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.css',
})
export class TableUserComponent {
  searchTerm = '';

  userDbService = inject(UserDbService);
  userStoreService = inject(UserStoreService);

  filteredUsers = signal<UserPayload[]>([]);
  users = this.userStoreService.users;

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser() {
    const users = await this.userDbService.getAllResources();
    console.log('In table-user, user : ', users);
    this.userStoreService.updateUserState(users);
    this.filteredUsers.set(users);
  }

  submitSearch(event: Event) {
    event.preventDefault();
    const filteredUsers = this.users()?.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredUsers.set(filteredUsers);
  }
}
