import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserDbService } from '../../services/user.service';
import { UserPayload } from '../../../models/auth/userPayload.model';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { UserViewDialogComponent } from '../user-view-dialog/user-view-dialog.component';

@Component({
  selector: 'app-delete-view-buttons-user-table',
  imports: [UserDeleteDialogComponent, UserViewDialogComponent],
  templateUrl: './delete-view-buttons-user-table.component.html',
  styleUrl: './delete-view-buttons-user-table.component.css',
})
export class DeleteViewButtonsUserTableComponent {
  user = input.required<UserPayload>();
  id = input.required<string>();

  isDeleteUser = signal(false);
  isViewUser = signal(false);
  refresh = signal(false);

  userDbService = inject(UserDbService);
  router = inject(Router);

  userDeleteConfirmation() {
    this.isDeleteUser.update((oldIsDeleteUser) => !oldIsDeleteUser);
  }

  userViewConfirmation() {
    console.log('In view, isView : ', this.isViewUser());
    this.isViewUser.update((oldIsViewUser) => !oldIsViewUser);
  }

  backToList() {
    console.log('At point 1', this.isDeleteUser());
    if (this.isDeleteUser())
      this.isDeleteUser.update((oldIsDeleteUser) => !oldIsDeleteUser);

    if (this.isViewUser())
      this.isViewUser.update((oldIsViewUser) => !oldIsViewUser);
  }

  async deleteUser(id: string) {
    console.log('user info deleted : ', id);

    await this.userDbService.deleteResource(id);

    this.isDeleteUser.update((oldIsDeleteUser) => !oldIsDeleteUser);

    this.refresh.update((oldRefresh) => !oldRefresh);
  }
}
