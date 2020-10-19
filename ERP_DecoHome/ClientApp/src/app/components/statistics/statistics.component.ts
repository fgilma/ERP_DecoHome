import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ItemsOrderService } from '../../services/items-order.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
ordersByDay: any[];
ordersByCustomer: any[];
ordersByEmployee: any[];
BestSellingProducts: any[];
error: string;
// color palette
colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

constructor(private orderService: OrderService,
            private itemsOrderService: ItemsOrderService) { }

ngOnInit(): void {
  // get sales by day, last 7 days
  this.orderService.getSalesByDay().subscribe({
    next: response => this.ordersByDay = response,
    error: err => this.error = err}
    );
  // get most important customers
  this.orderService.getSalesByCustomer().subscribe({
    next: response => this.ordersByCustomer = response,
    error: err => this.error = err}
    );
  // get sales by employee
  this.orderService.getSalesByEmployee().subscribe({
      next: response => this.ordersByEmployee = response,
      error: err => this.error = err}
      );
  // get the soldest products
  this.itemsOrderService.BestSellingProducts().subscribe({
      next: response => this.BestSellingProducts = response,
      error: err => this.error = err}
      );
    }

  }






