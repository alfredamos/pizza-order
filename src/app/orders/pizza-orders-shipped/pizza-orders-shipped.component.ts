import { Component, inject } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { Status } from '../../../models/auth/status.model';

@Component({
  selector: 'app-pizza-orders-shipped',
  imports: [],
  templateUrl: './pizza-orders-shipped.component.html',
  styleUrl: './pizza-orders-shipped.component.css',
})
export class PizzaOrdersShippedComponent {
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = (await this.orderDbService.getAllResources())?.filter(
      (order) => order.status === Status.Shipped
    );

    this.orderStoreService.editAllOrders(orders);
  }

  async onDeliveredOrder(orderId: string) {
    console.log('is-delivered');
    const updatedOrder = await this.orderDbService.orderDelivered(orderId);

    console.log('all-orders-delivered, updatedOrder : ', updatedOrder);

    this.orderStoreService.editOrder(updatedOrder);
  }


}
