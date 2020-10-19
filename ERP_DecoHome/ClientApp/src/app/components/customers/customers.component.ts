import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { ICustomer } from '../../interfaces/icustomer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: ICustomer[];
  error: string;
  p = 1;

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    // get customers
    this.customerService.getCustomers().subscribe({
      next: response => this.customers = response,
      error: err => this.error = err
    });
  }

  createCustomer(): void {
    this.router.navigate(['/createCustomer']);
  }

  deleteCustomer(id: number): void {
      console.log(id);
      if (confirm(`Really delete the customer: ${id}?`)) {
        this.customerService.deleteCustomer(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.error = err
          });
      }
    }

    onSaveComplete(): void {
     // update template after changes
      this.customerService.getCustomers().subscribe({
        next: response => this.customers = response,
        error: err => this.error = err
    });
  }
}
