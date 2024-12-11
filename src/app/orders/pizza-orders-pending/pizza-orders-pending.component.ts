import { Component, inject, signal } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { Status } from '../../../models/auth/status.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pizza-orders-pending',
  imports: [DatePipe],
  templateUrl: './pizza-orders-pending.component.html',
})
export class PizzaOrdersPendingComponent {
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = (await this.orderDbService.getAllResources())?.filter(
      (order) => order.status === Status.Pending
    );
    console.log({ orders });
    this.orderStoreService.changeIsPending(false);
    this.orderStoreService.editAllOrders(orders);
  }

  async onDeliveredOrder(orderId: string) {
    console.log('is-delivered');
    const updatedOrder = await this.orderDbService.orderDelivered(orderId);

    this.orderStoreService.editOrder(updatedOrder);
  }

  async onShippedOrder(orderId: string) {
    console.log('is-shipped');
    this.orderStoreService.changeIsPending(false);

    const updatedOrder = await this.orderDbService.orderShipped(orderId);

    this.orderStoreService.editOrder(updatedOrder);
  }
}
