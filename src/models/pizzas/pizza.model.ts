import { CartItem } from "../orders/cartItem.model";

export class Pizza{
   id: string = ""
  name: string = "";
  topping: string = "";
  price: number = 0;
  quantity: number = 0;
  image: string = "";
  description: string = ""; 
  cartItems:  CartItem[] = []
  userId: string = "";
}