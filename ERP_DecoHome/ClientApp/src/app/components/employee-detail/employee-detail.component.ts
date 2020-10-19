import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../interfaces/iemployee';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  showData2 = false;
  employee: IEmployee;
  error: string;
  orders: IOrder[];
  p = 1;
  state = '';

  // priority colors
  colors = [{ prioridad: 'Muy urgente', color: 'darkred' }, { prioridad: 'Urgente', color: 'orangered' },
                { prioridad: 'Normal', color: 'blue' }];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // get data employee
    this.employeeService.getEmployeeById(id).subscribe({
        next: response => this.employee = response,
        error: err => this.error = err});
    // get orders by employee
    this.orderService.getOrderByEmployee(id).subscribe({
      next: response => this.orders = response,
      error: err => this.error = err});
  }
  // show employee data
  controlEmployee(): void{
    this.showData2 = !this.showData2;
  }

   // set color by priority
   getColor(priority): any {
    return this.colors.filter(item => item.prioridad === priority)[0].color;
    }
  onBack(): void {
    this.router.navigate(['/employees']);
  }
  // return true if user has admin rol
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'Administrador';
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
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByEmployee(id).subscribe({
      next: response => this.orders = response,
      error: err => this.error = err}
      );
  }
}
