import { Component, inject, signal } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { Status } from '../../../models/auth/status.model';
import { OrderModel } from '../../../models/orders/orderModel.model';
import { OrdersTableGeneralComponent } from '../orders-table-general/orders-table-general.component';

@Component({
  selector: 'app-pizza-orders-shipped',
  imports: [OrdersTableGeneralComponent],
  templateUrl: './pizza-orders-shipped.component.html',
  styleUrl: './pizza-orders-shipped.component.css',
})
export class PizzaOrdersShippedComponent {
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;
  allOrders = signal<OrderModel[]>([]);

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = (await this.orderDbService.getAllResources())?.filter(
      (order) => order.status === Status.Shipped
    );

    this.allOrders.set(orders);

    this.orderStoreService.editAllOrders(orders);
  }

  async onDeliveredOrder(orderId: string) {
    console.log('is-delivered');
    const updatedOrder = await this.orderDbService.orderDelivered(orderId);

    this.allOrders.set(this.orders()?.map(order => order.id === orderId ? updatedOrder : order)?.filter(ord => ord.status === Status.Shipped));

    this.orderStoreService.editOrder(updatedOrder);
  }


}
