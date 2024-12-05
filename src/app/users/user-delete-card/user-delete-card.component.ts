import { Component, input, output } from '@angular/core';
import { UserPayload } from '../../../models/auth/userPayload.model';

@Component({
  selector: 'app-user-delete-card',
  imports: [],
  templateUrl: './user-delete-card.component.html',
  styleUrl: './user-delete-card.component.css',
})
export class UserDeleteCardComponent {
  user = input.required<UserPayload>();
  onBackToList = output<void>();
  onDelete = output<string>();

  backToList() {
    console.log('Back to list!!!');
    this.onBackToList.emit();
  }

  deleteUser(userId: string) {
    this.onDelete.emit(userId);
  }
}
