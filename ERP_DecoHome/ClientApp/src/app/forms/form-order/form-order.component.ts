import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { EmployeeService } from '../../services/employee.service';
import { PriorityService } from '../../services/priority.service';
import { CustomerService } from '../../services/customer.service';
import { StateService } from '../../services/state.service';
import { IEmployee } from 'src/app/interfaces/iemployee';
import { IPriority } from '../../interfaces/ipriority';
import { IState } from '../../interfaces/istate';
import { IOrder } from '../../interfaces/iorder';
import { ICustomer } from '../../interfaces/icustomer';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {
  title: string;
  orderForm: FormGroup;
  error: string;
  order: IOrder;
  customer: ICustomer;
  showTransport = false;
  employees: IEmployee[];
  priorities: IPriority[];
  states: IState[];
  nameEmployee: string;
  employeeName: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private customerService: CustomerService,
              private stateService: StateService) { }

  ngOnInit(): void {

    this.title = 'Editar';
    // Edit order form
    this.orderForm = this.fb.group({
      stateId: [''],
      priorityId: [''],
      startDate: [''],
      assignDate: [''],
      endDate: [''],
      employeeId: ['']
    });
    // Get employees to select one
    this.employeeService.getEmployees().subscribe({
      next: (response: IEmployee[]) => this.employees = response,
      error: err => this.error = err
    });
    // Get priorities to select one
    this.priorityService.getPriorities().subscribe({
      next: (response: IPriority[]) => this.priorities = response,
      error: err => this.error = err
    });
    // Get states to select one
    this.stateService.getStates().subscribe({
      next: (response: IState[]) => this.states = response,
      error: err => this.error = err
    });

    // Get user's name and surnames to assign order
    this.employeeService.getEmployeeById(localStorage.getItem('id')).subscribe({
      next: (response: IEmployee) =>
        this.nameEmployee = response.name + ' ' + response.surname1 + ' ' + response.surname2,
      error: err => this.error = err
    });

    // Get id order
    const id = +this.route.snapshot.paramMap.get('id');

    this.orderService.getOrderById(id).subscribe({
      next: (response: IOrder) => {

        this.order = response;
        // assign unassigned orders to users not admin
        if (response.employeeId === null) {
              this.employeeName = this.nameEmployee;
              this.order.employeeId = this.idEmployee();
          } else {
            this.employeeName = `${this.order.employee.name} ${this.order.employee.surname1} ${this.order.employee.surname2}`;
          }
        // show order data before editing
        this.orderForm.patchValue({
            stateId: this.order.stateId,
            priorityId: this.order.priorityId,
            startDate: this.formatDate(this.order.startDate),
            assignDate: this.formatDate(this.order.assignDate),
            endDate: this.formatDate(this.order.endDate),
            employeeId: this.order.employeeId
          });
        },
      error: err => this.error = err
    });

  }

  // update data order
  saveOrder(): void {
    const p = { ...this.order, ...this.orderForm.value };
    this.orderService.updateOrder(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.error = err
            });
  }

  // Reset the form to clear the flags and return to order list
  onSaveComplete(): void {
    this.orderForm.reset();
    this.onBack();
  }

 // manage transport address view
  controlTransport(): void {
    this.showTransport = !this.showTransport;
  }

  // return true if user is admin
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'Administrador';
  }

  idEmployee(): string {
    return localStorage.getItem('id');
  }

  // turn dates into proper format
  private formatDate(date): any {
    if (date == null) {
      console.log('hay un nulo');
      return ('');
    }
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if ( month.length < 2 ) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

// Return to order list
onBack(): void {
  const optionRoute = this.route.snapshot.paramMap.get('option');
  const option1 = this.route.snapshot.paramMap.get('option1');
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
}
