import { CartItem } from '../cartItems/cartItem.model';
import { Status } from './status.model';
import { UserResponseModel } from './userResponse.model';

export class OrderModel {
  id!: string;
  userId!: string;
  user?: UserResponseModel;
  cartItems: CartItem[] = [];
  isDelivered?: boolean;
  isShipped?: boolean;
  deliveryDate?: Date;
  shippingDate?: Date;
  orderDate!: Date;
  status!: Status;
  totalPrice!: number;
  totalQuantity!: number;
}
