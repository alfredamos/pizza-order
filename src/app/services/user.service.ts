import { Injectable } from "@angular/core";
import { UserPayload } from "../../models/auth/userPayload.model";
import { ApiClientService } from "./apiClient.service";

@Injectable({
  providedIn: 'root',
})
class UserDbService extends ApiClientService<UserPayload> {
  constructor() {
    super('http://localhost:5000/api/users');
  }
}

export const userDbService = new UserDbService();
