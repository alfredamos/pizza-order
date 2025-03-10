import { Injectable } from '@angular/core';
import { UserPayload } from '../../models/users/userPayload.model';
import { ApiClientService } from './apiClient.service';

@Injectable({
  providedIn: 'root',
})
export class UserDbService extends ApiClientService<UserPayload> {
  constructor() {
    super('http://localhost:3000/api/users');
  }
}
