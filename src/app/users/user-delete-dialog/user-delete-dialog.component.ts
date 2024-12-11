import { Component, input, output } from '@angular/core';
import { UserPayload } from '../../../models/users/userPayload.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { UserDeleteCardComponent } from '../user-delete-card/user-delete-card.component';

@Component({
  selector: 'app-user-delete-dialog',
  imports: [ModalAlertComponent, UserDeleteCardComponent],
  templateUrl: './user-delete-dialog.component.html',
  styleUrl: './user-delete-dialog.component.css',
})
export class UserDeleteDialogComponent {
  isDelete = input.required<boolean>();
  user = input.required<UserPayload>();
  onBackToList = output<void>();
  onDelete = output<string>();

  backToList() {
    this.onBackToList.emit();
  }

  deleteUser(userId: string) {
    this.onDelete.emit(userId);
  }
}
