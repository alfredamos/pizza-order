import { Injectable } from '@angular/core';
import { OrderPayload } from '../../models/auth/orderPayload.model';
import { ApiClientService } from './apiClient.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDbService extends ApiClientService<OrderPayload> {
  constructor() {
    super('http://localhost:5000/api/orders');
  }
}
