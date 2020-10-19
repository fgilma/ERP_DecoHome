import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/icustomer';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: ICustomer;
  error: string;
  orders: IOrder[];
  total: any;
  state = '';
  p = 1;
  showData = false;

  // priority colors
  colors = [{ prioridad: 'Muy urgente', color: 'darkred' }, { prioridad: 'Urgente', color: 'orangered' },
                { prioridad: 'Normal', color: 'blue' }];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // get data customer
    this.customerService.getCustomerById(id).subscribe({
        next: response => this.customer = response,
        error: err => this.error = err}
        );
    // get all money customer has spent
    this.orderService.getSalesByCustomerId(id).subscribe({
          next: response => {this.total = response;
                             console.log(this.total); },
          error: err => this.error = err}
        );
  }

  // set color by priority
  getColor(priority): any {
    return this.colors.filter(item => item.prioridad === priority)[0].color;
    }
  // show customer data
  controlCustomer(): void {
    this.showData = !this.showData;
  }
  // return true if user has admin rol
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'Administrador';
  }
  onBack(): void {
    this.router.navigate(['/customers']);
  }

  deleteOrder(id: number): void {
      if (confirm(`Really delete the product: ${id}?`)) {
        this.orderService.deleteOrder(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.error = err
          });
      }
  }
  onSaveComplete(): void {
    // update template after changes
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerById(id).subscribe({
      next: response => this.customer = response,
      error: err => this.error = err}
      );
    this.orderService.getSalesByCustomerId(id).subscribe({
        next: response => {this.total = response;
                           console.log(this.total); },
        error: err => this.error = err}
      );
  }
}
