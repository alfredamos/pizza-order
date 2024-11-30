import { signal, computed } from '@angular/core';
import { OrderState } from '../../models/orders/orderState.model';
import { OrderPayload } from '../../models/auth/orderPayload.model';

export class OrderStoreService {
  private orderState = signal<OrderState>({ ...new OrderState() });
  stateOrder = this.orderState.asReadonly();

  orders = computed(() => this.stateOrder()?.orders);

  addOrder(order: OrderPayload) {
    const newOrders = [...this.orderState()?.orders, order];
    this.orderState.update((orderState) => ({
      ...orderState,
      orders: newOrders,
    }));
  }

  deleteOrder(orderId: string) {
    const newOrders = this.orderState()?.orders?.filter(
      (order) => order.id !== orderId
    );
    this.orderState.update((orderState) => ({
      ...orderState,
      orders: newOrders,
    }));
  }

  editOrder(orderPayload: OrderPayload) {
    const newOrders = this.orderState()?.orders?.map((order) =>
      order.id === order.id ? orderPayload : order
    );
    this.orderState.update((orderState) => ({
      ...orderState,
      orders: newOrders,
    }));
  }
}
