import { Component, inject } from '@angular/core';
import { OrderDbService } from '../../services/orderDb.service';
import { OrderStoreService } from '../../services/orderStore.service';
import { OrderPayload } from '../../../models/orders/orderPayload.model';
import { OrderModel } from '../../../models/orders/orderModel.model';
import { Status } from '../../../models/auth/status.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersTableGeneralComponent } from '../orders-table-general/orders-table-general.component';

@Component({
  selector: 'app-pizza-orders-delivered',
  imports: [OrdersTableGeneralComponent],
  templateUrl: './pizza-orders-delivered.component.html',
  styleUrl: './pizza-orders-delivered.component.css',
})
export class PizzaOrdersDeliveredComponent {
  orderDbService = inject(OrderDbService);
  orderStoreService = inject(OrderStoreService);

  orders = this.orderStoreService.orders;

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder() {
    const orders = (await this.orderDbService.getAllResources())?.filter(
      (order) => order.status === Status.Delivered
    ) as OrderModel[];
    this.orderStoreService.editAllOrders(orders);
  }
}
