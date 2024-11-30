import { CartItem } from '../cartItems/cartItem.model';

export class OrderPayload {
  id: string = '';
  cartItems: CartItem[] = [];
  paymentId: string = '';
  userId: string = '';
  totalPrice: number = 0;
  totalQuantity: number = 0;
  orderDate: Date = new Date();
}
