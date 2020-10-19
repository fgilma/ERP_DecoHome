import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ItemsOrderService } from '../../services/items-order.service';
import { IOrderItem } from '../../interfaces/iorder-item';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-items-order',
  templateUrl: './items-order.component.html',
  styleUrls: ['./items-order.component.css']
})
export class ItemsOrderComponent implements OnInit {

  p = 1;
  items = [];
  error: string;
  order: IOrder;
  total: number;
  nameCustomer: string;
  numberOrder: number;
  optionRoute: any;
  option1: any;

  constructor(private itemsOrderService: ItemsOrderService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit(): void {
    // get parameters url to know origin: order, customer, employee
    this.optionRoute = this.route.snapshot.paramMap.get('option');
    this.option1 = this.route.snapshot.paramMap.get('option1');
    // get data from order
    const orderId = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: IOrder) => {this.nameCustomer = response.customer.name;
                                   this.numberOrder = response.id; },
      error: err => this.error = err
    });
    // get total euros
    this.itemsOrderService.getTotal(orderId).subscribe({
      next: (response) => this.total = response[2],
      error: err => this.error = err
    });
    // get items order
    this.itemsOrderService.getItemsOrder(orderId).subscribe({
                  next: response => this.items = response,
                  error: err => this.error = err}
                  );
  }


 // Delete items
  deleteItemOrder(id: number): void {
    if (confirm(`Really delete the product: ${id}?`)) {
      this.itemsOrderService.deleteItemOrder(id)
        .subscribe({
          next: () => this.updateOrder(),
          error: err => this.error = err
        });
    }
  }

 // Update order after deleting
  updateOrder(): void {
    const orderId = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(orderId).subscribe({
                      next: (response: IOrder) => this.order = response,
                      error: err => this.error = err
                    });
    this.itemsOrderService.getTotal(orderId).subscribe({
                      next: (response: number[]) => {
                                  this.order.totalCost = response[0];
                                  this.order.totalPvp = response[1];
                                  this.order.totalPvpIva = response[2];
                                  this.total = response[2];
                                  this.orderService.updateOrder(this.order).subscribe({
                                                  next: () => this.onSaveComplete(),
                                                  error: err => this.error = err
                                  });
                      },
                      error: err => this.error = err
    });
  }
  onSaveComplete(): void {
    // update template after changes
    const orderId = +this.route.snapshot.paramMap.get('id');
    this.itemsOrderService.getItemsOrder(orderId).subscribe({
      next: response => this.items = response,
      error: err => this.error = err
    });
  }

  // Go to create more items saving the origin on the url
  createItem(): void {
    const orderId = +this.route.snapshot.paramMap.get('id');
    const optionRoute = this.route.snapshot.paramMap.get('option');
    const option1 = this.route.snapshot.paramMap.get('option1');
    if (optionRoute === 'order'){
      this.router.navigate(['/createItem', 'order', orderId, '0'], { queryParamsHandling: 'preserve'});
    }
    else if (optionRoute === 'customer'){

      this.router.navigate(['/createItem', 'customer', option1, orderId , '0']);
    }
    else if (optionRoute === 'employee'){
      this.router.navigate(['/createItem', 'employee', option1, orderId , '0']);
    }
  }

  // Return to order list
  onBack(): void {
    const optionRoute = this.route.snapshot.paramMap.get('option');
    const option1 = this.route.snapshot.paramMap.get('option1');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const id = this.route.snapshot.paramMap.get('id');
    if (optionRoute === 'order'){
      this.router.navigate(['/orders'], { queryParamsHandling: 'preserve'});
    }
    else if (optionRoute === 'customer'){

      this.router.navigate(['/customers', option1]);
    }
    else if (optionRoute === 'employee'){
      this.router.navigate(['/employees', option1]);
    }
  }

  // Go to edit item
  onForward(): void {

    const optionRoute = this.route.snapshot.paramMap.get('option');
    const option1 = this.route.snapshot.paramMap.get('option1');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const id = this.route.snapshot.paramMap.get('id');
    if (optionRoute === 'order'){
      this.router.navigate(['/editItem', 'order', orderId, id], { queryParamsHandling: 'preserve'});
    }
    else if (optionRoute === 'customer'){

      this.router.navigate(['/editItem', 'customer', option1, orderId, id]);
    }
    else if (optionRoute === 'employee'){
      this.router.navigate(['/editItem', 'employee', option1, orderId, id]);
    }
  }
}
