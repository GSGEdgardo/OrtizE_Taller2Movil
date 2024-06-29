import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { jwtDecode } from 'jwt-decode';

function extractRoleFromToken(token: string): string {
  const decodedToken: any = jwtDecode(token);
  return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = `${environment.apiUrl}auth`;
  private currentAccountSource = new BehaviorSubject<Account | null>(null);
  currentAccount$ = this.currentAccountSource.asObservable();

  get currentAccountValue(): Account | null {
    return this.currentAccountSource.value;
  }

  constructor(private http: HttpClient) { }

  login(model: any): Observable<void> {
    return this.http.post<{ user: any, token: string }>(this.baseUrl + '/login', model).pipe(
      map(response => {
        const role = extractRoleFromToken(response.token);
        localStorage.setItem('token', response.token);
        const account: Account = {
          id: response.user.id,
          email: response.user.email,
          token: response.token,
          roleId: role === "Admin" ? 1 : 2,
          roleType: role,
          name: response.user.name,
          isActive: response.user.isActive,
        };

        if (account) {
          this.setCurrentAccount(account);
        }
      })
    );
  }

  setCurrentAccount(account: Account): void {
    localStorage.setItem('account', JSON.stringify(account));
    this.currentAccountSource.next(account);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.currentAccountSource.next(null);
  }
}