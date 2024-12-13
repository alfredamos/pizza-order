import { Component, inject } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-orders',
  imports: [DatePipe],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.css',
})
export class TableOrdersComponent {
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = await this.orderDbService.getAllResources();
    this.orderStoreService.editAllOrders(orders);
  }

  async onDeliveredOrder(orderId: string) {
    console.log('is-delivered');
    const updatedOrder = await this.orderDbService.orderDelivered(orderId);

    console.log('all-orders-delivered, updatedOrder : ', updatedOrder);

    this.orderStoreService.editOrder(updatedOrder);
  }

  async onShippedOrder(orderId: string) {
    console.log('is-shipped');

    const updatedOrder = await this.orderDbService.orderShipped(orderId);

    console.log('all-orders-shipped, updatedOrder : ', updatedOrder);

    this.orderStoreService.editOrder(updatedOrder);
  }

  async onDeleteOrder(orderId: string) {
    await this.orderDbService.deleteResource(orderId);

    this.orders()?.filter((order) => order.id !== orderId);

    this.orderStoreService.deleteOrder(orderId);
  }
}
