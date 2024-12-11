import { CartItem } from '../cartItems/cartItem.model';
import { Status } from '../auth/status.model';
import { UserResponseModel } from '../users/userResponse.model';

export class OrderModel {
  id!: string;
  userId!: string;
  user?: UserResponseModel;
  cartItems: CartItem[] = [];
  isDelivered?: boolean;
  isShipped?: boolean;
  isPending?: boolean;
  deliveryDate?: Date;
  shippingDate?: Date;
  orderDate!: Date;
  status!: Status;
  totalPrice!: number;
  totalQuantity!: number;
}
