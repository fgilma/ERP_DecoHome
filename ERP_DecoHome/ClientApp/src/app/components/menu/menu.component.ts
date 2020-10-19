import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  isExpanded = false;

  constructor(private accountService: AccountService,
              private employeeService: EmployeeService,
              private router: Router) { }

 collapse(): void {
    this.isExpanded = false;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
  // get logout
  logout(): void {
    this.accountService.logout();
  }
 // return true if user is logged in
  isLoggedIn(): boolean {
    return this.accountService.isLogged();
  }
  // return true if user has admin rol
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'Administrador';
  }
  // get username
  getUser(): string {
    return localStorage.getItem('userName');
  }

}
