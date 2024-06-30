import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  /**
   * @description Gets the sales for a specific user.
   * @param userId number The ID of the user.
   * @returns Observable<Sale[]> An observable containing an array of sales.
   */
  getUserSales(userId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.baseUrl}user/${userId}/purchases`);
  }
}
