import { Injectable } from '@angular/core';
import { ApiClientService } from './apiClient.service';
import { OrderModel } from '../../models/orders/orderModel.model';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderDbService extends ApiClientService<OrderModel> {
  constructor() {
    super('http://localhost:5000/api/orders');
  }

  async orderDelivered(orderId: string){
    const url = `${this.baseUrl}/delivered/${orderId}`
    const response$ = this.http.patch<OrderModel>(url,{});
    const response = await firstValueFrom(response$);

    return response;
  }
  async orderShipped(orderId: string){
    const url = `${this.baseUrl}/shipped/${orderId}`
    const response$ = this.http.patch<OrderModel>(url,{});
    const response = await firstValueFrom(response$);

    return response;
  }
}
