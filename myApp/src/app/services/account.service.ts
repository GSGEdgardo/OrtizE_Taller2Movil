import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { jwtDecode } from 'jwt-decode';

/**
 * @description Extracts the role from the JWT token.
 * @param token string The JWT token.
 * @returns string The role extracted from the token.
 */
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

  /**
   * @description Logs in the user.
   * @param model any The login credentials.
   * @returns Observable<void> An observable that completes when the login is successful.
   */
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

  /**
   * @description Sets the current account.
   * @param account Account The account to set.
   */
  setCurrentAccount(account: Account): void {
    localStorage.setItem('account', JSON.stringify(account));
    this.currentAccountSource.next(account);
  }

  /**
   * @description Logs out the current user.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.currentAccountSource.next(null);
  }
}
