import { Component, input, output } from '@angular/core';
import { UserPayload } from '../../../models/auth/userPayload.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { UserViewCardComponent } from '../user-view-card/user-view-card.component';

@Component({
  selector: 'app-user-view-dialog',
  imports: [ModalAlertComponent, UserViewCardComponent],
  templateUrl: './user-view-dialog.component.html',
  styleUrl: './user-view-dialog.component.css',
})
export class UserViewDialogComponent {
  isView = input.required<boolean>();
  user = input.required<UserPayload>();
  onBackToList = output<void>();

  backToList() {
    this.onBackToList.emit();
  }
}
