import { Component, output, input } from '@angular/core';
import { OrderModel } from '../../../models/orders/orderModel.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-table-general',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders-table-general.component.html',
  styleUrl: './orders-table-general.component.css'
})
export class OrdersTableGeneralComponent {
  //----> Input prop.
  orders = input.required<OrderModel[]>();
  isShowAction = input<boolean>(true);
  isDelivered = input<boolean>(false);
  isDeleted = input<boolean>(false);
  isShipped = input<boolean>(false);
  isShowHandlers = input<boolean>(true);
  
  //----> Output handler
  onDeliveredOrder = output<string>();
  onShippedOrder = output<string>();
  onDeleteOrder = output<string>();

  deliveredOrder(orderId: string){
    this.onDeliveredOrder.emit(orderId);
  }

  deleteOrder(orderId: string){
    this.onDeleteOrder.emit(orderId);
  }

  shippedOrder(orderId: string){
    this.onShippedOrder.emit(orderId);
  }
}
