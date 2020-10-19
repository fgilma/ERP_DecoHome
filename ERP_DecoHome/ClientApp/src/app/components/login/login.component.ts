import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              public router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group ({
                  email: ['', Validators.required],
                  password: ['', Validators.required]
    });
  }


  login(): void {
    const user = {email: this.loginForm.value.email, password: this.loginForm.value.password};
    // get authentication: token and time validation
    this.accountService.login(user).subscribe({
                  next: response => this.recibirToken(response),
                  error: err => {this.error = err;
                                 this.loginForm.reset();
                  }
                });
    // get rol, username
    this.accountService.getEmployeeByUser(user.email).subscribe({
      next: response => {localStorage.setItem('rol', response.rol);
                         localStorage.setItem('id', response.id);
                         localStorage.setItem('userName', response.name);
                       },
      error: err => this.error = err
    });

  }

  recibirToken(token): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate(['/']);
  }

  resetForm(): void {
    this.loginForm.reset();
    this.router.navigate(['/login']);
  }
}
