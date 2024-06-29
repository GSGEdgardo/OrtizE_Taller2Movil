import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, RouterModule, UrlTree } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuardFn: (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = (
  route,
  state
) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const account = accountService.currentAccountValue;
  console.log('Current account role ID:', account?.roleId);
  console.log('Current account role type:', account?.roleType);
  console.log('Current account email:', account?.email);
  console.log('Current account token:', account?.token);

  if(account) {
    if(account.roleId === 2 && state.url.startsWith('/sales')) {
      return true;
    }
  }
  return router.createUrlTree(['/login']);
}


