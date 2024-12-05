import { Component, effect, inject } from '@angular/core';
import { UserStoreService } from '../../services/userStore.service';
import { DeleteViewButtonsUserTableComponent } from '../delete-view-buttons-user-table/delete-view-buttons-user-table.component';

@Component({
  selector: 'app-table-user',
  imports: [DeleteViewButtonsUserTableComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.css',
})
export class TableUserComponent {
  searchTerm = '';

  userStoreService = inject(UserStoreService);

  enteredUsers = this.userStoreService?.users;

  userEffect = effect(() => console.log('table-user : ', this.enteredUsers()));

  submitSearch(event: Event) {
    event.preventDefault();
    this.enteredUsers()?.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
