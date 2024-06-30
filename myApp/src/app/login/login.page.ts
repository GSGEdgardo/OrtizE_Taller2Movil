import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * @description Initializes the component and sets up the login form.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * @description Initializes the login form with validation.
   */
  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * @description Logs in the user if the form is valid, and navigates to the sales page if the user has the appropriate role.
   */
  login(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => {
          const account = this.accountService.currentAccountValue;
          if (account?.roleId === 2) {
            this.router.navigateByUrl('/sales');
          }
        },
        error: error => {
          this.errorMessage = 'Las credenciales ingresadas no se encuentran en el sistema.';
          console.error("Fallido", error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }
}
