import { Component, input, output } from '@angular/core';
import { UserPayload } from '../../../models/auth/userPayload.model';

@Component({
  selector: 'app-user-view-card',
  imports: [],
  templateUrl: './user-view-card.component.html',
  styleUrl: './user-view-card.component.css',
})
export class UserViewCardComponent {
  user = input.required<UserPayload>();
  onCancel = output<void>();

  backToList() {
    this.onCancel.emit();
  }
}
