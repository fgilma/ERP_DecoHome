import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  error: string;
  p: string;
  state = '';
  orders: IOrder[];

  // priority colors
  colors = [{ prioridad: 'Muy urgente', color: 'darkred' }, { prioridad: 'Urgente', color: 'orangered' },
                { prioridad: 'Normal', color: 'blue' }];

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.p = this.route.snapshot.queryParamMap.get('pagina') || '1';
    // get orders
    this.orderService.getOrders().subscribe({
                next: response => this.orders = response,
                error: err => this.error = err
    });
  }

// set color by priority
  getColor(priority): any {
    return this.colors.filter(item => item.prioridad === priority)[0].color;
  }
  createOrder(): void {
    this.router.navigate(['/createOrder']);
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
    this.orderService.getOrders().subscribe({
      next: response => this.orders = response,
      error: err => this.error = err
  });
  }
}
