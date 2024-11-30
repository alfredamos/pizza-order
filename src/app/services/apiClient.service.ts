import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export class ApiClientService<T> {
  http = inject(HttpClient);

  constructor(public baseUrl: string) {}

  async createResource(resource: T) {
    const response$ = this.http.post<T>(this.baseUrl, resource);

    const response = await firstValueFrom(response$);

    return response;
  }

  async deleteResource(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const response$ = this.http.delete<T>(url);

    const response = await firstValueFrom(response$);

    return response;
  }

  async editResource(id: string, resource: T) {
    const url = `${this.baseUrl}/${id}`;

    const response$ = this.http.patch<T>(url, resource);

    const response = await firstValueFrom(response$);

    return response;
  }

  async getOneResource(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const response$ = this.http.get<T>(url);

    const response = await firstValueFrom(response$);

    return response;
  }

  async getAllResources() {
    const response$ = this.http.get<T[]>(this.baseUrl);

    const response = await firstValueFrom(response$);
    console.log({ url: this.baseUrl, response });
    return response;
  }
}
