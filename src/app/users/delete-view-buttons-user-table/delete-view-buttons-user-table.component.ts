import { Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserDbService } from '../../services/userDb.service';
import { UserPayload } from '../../../models/users/userPayload.model';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { UserViewDialogComponent } from '../user-view-dialog/user-view-dialog.component';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-delete-view-buttons-user-table',
  imports: [UserDeleteDialogComponent, UserViewDialogComponent],
  templateUrl: './delete-view-buttons-user-table.component.html',
  styleUrl: './delete-view-buttons-user-table.component.css',
})
export class DeleteViewButtonsUserTableComponent {
  user = input.required<UserPayload>();
  id = input.required<string>();

  onDelete = output<string>();

  isDeleteUser = signal(false);
  isViewUser = signal(false);
  refresh = signal(false);

  userDbService = inject(UserDbService);
  router = inject(Router);
  toast = inject(HotToastService);

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

    this.onDelete.emit(id);

    this.toast.success("User deleted successfully!");

    this.isDeleteUser.update((oldIsDeleteUser) => !oldIsDeleteUser);

    this.refresh.update((oldRefresh) => !oldRefresh);
  }
}
