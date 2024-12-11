import { Component, inject } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { AuthStoreService } from '../../services/authStore.service';

@Component({
  selector: 'app-orders-by-user-id',
  imports: [],
  templateUrl: './orders-by-user-id.component.html',
  styleUrl: './orders-by-user-id.component.css',
})
export class OrdersByUserIdComponent {
  authStoreService = inject(AuthStoreService);
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;
  userId = this.authStoreService.currentUser()?.id;

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = await this.orderDbService.getAllOrdersByUserId(this.userId);

    console.log({userId: this.userId, orders})

    this.orderStoreService.editAllOrders(orders);
  }


}
