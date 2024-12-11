import { OrderModel } from './orderModel.model';

export class OrderState {
  orders: OrderModel[] = [];
  isDelivered: boolean = false;
  isShipped: boolean = false;
  isPending: boolean = true;
}
