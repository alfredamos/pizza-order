import { Injectable } from "@angular/core";
import { OrderPayload } from "../../models/auth/orderPayload.model";
import { ApiClientService } from "./apiClient.service";

@Injectable({
  providedIn: 'root',
})
class OrderDbService extends ApiClientService<OrderPayload> {
  constructor() {
    super('http://localhost:5000/api/orders');
  }
}

export const orderDbService = new OrderDbService()