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

  getUserSales(userId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.baseUrl}user/${userId}/purchases`);
  }
}
