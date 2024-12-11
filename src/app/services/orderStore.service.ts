import { signal, computed, Injectable } from '@angular/core';
import { OrderState } from '../../models/orders/orderState.model';
import { OrderModel } from '../../models/orders/orderModel.model';

@Injectable({
  providedIn: 'root',
})
export class OrderStoreService {
  private orderState = signal<OrderState>({ ...new OrderState() });
  stateOrder = this.orderState.asReadonly();

  orders = computed(() => this.stateOrder()?.orders);
  isDelivered = computed(() => this.stateOrder()?.isDelivered);
  isShipped = computed(() => this.stateOrder()?.isShipped);

  constructor() {
    const orders = this.getLocalStorageOrders();

    if (orders?.length) {
      this.editAllOrders(orders);
    }
  }

  addOrder(order: OrderModel) {
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

  editOrder(orderPayload: OrderModel) {
    const newOrders = this.orderState()?.orders?.map((order) =>
      order.id === orderPayload.id ? orderPayload : order
    );
    this.orderState.update((orderState) => ({
      ...orderState,
      orders: newOrders,
    }));
  }

  editAllOrders(orders: OrderModel[]) {
    this.orderState.update((orderState) => ({
      ...orderState,
      orders,
    }));
  }

  changeIsDelivered(value: boolean) {
    this.orderState.update((oldOrderState) => ({
      ...oldOrderState,
      isDelivered: value,
    }));
  }

  changeIsShipped(value: boolean) {
    this.orderState.update((oldOrderState) => ({
      ...oldOrderState,
      isShipped: value,
    }));
  }

  changeIsPending(value: boolean) {
    this.orderState.update((oldOrderState) => ({
      ...oldOrderState,
      isPending: value,
    }));
  }

  getLocalStorageOrders(): OrderModel[] {
    return JSON.parse(localStorage.getItem('orders')!) as OrderModel[];
  }

  removeLocalstorageOrders() {
    localStorage.removeItem('orders');
  }

  setLocalStorageOrders(orders: OrderModel[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}
