import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { SalesService } from '../services/sales.service';
import { Sale } from '../models/sale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  sales: Sale[] = [];

  constructor(private salesService: SalesService, private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    const currentUser = this.accountService.currentAccountValue;
    if (currentUser) {
      this.salesService.getUserSales(currentUser.id).subscribe(sales => {
        this.sales = sales;
      });
    }
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
