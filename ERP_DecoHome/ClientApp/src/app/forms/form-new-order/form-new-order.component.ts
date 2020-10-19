import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { PriorityService } from '../../services/priority.service';
import { StateService } from '../../services/state.service';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/icustomer';
import { IPriority } from '../../interfaces/ipriority';
import { IState } from '../../interfaces/istate';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-form-new-order',
  templateUrl: './form-new-order.component.html',
  styleUrls: ['./form-new-order.component.css']
})
export class FormNewOrderComponent implements OnInit {
  customers: ICustomer[];
  customer: ICustomer;
  priorities: IPriority[];
  states: IState[];
  error: string;
  showTransport = false;
  showButtonItems = false;
  newOrderForm: FormGroup;
  idCustomer: number;
  order: IOrder;
  newId: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private stateService: StateService,
              private orderService: OrderService,
              private customerService: CustomerService) { }

  ngOnInit(): void {

     // Customers
     this.customerService.getCustomers().subscribe({
      next: (response: ICustomer[]) => this.customers = response,
      error: err => this.error = err
    });
    // Priorities
     this.priorityService.getPriorities().subscribe({
      next: (response: IPriority[]) => this.priorities = response,
      error: err => this.error = err
    });
    // Form order
     this.newOrderForm = this.fb.group({

      customerId: ['', Validators.required],
      priorityId: [1],
      startDate: [this.formatDate(new Date())],
      address: [''],
      number: [''],
      flat: [''],
      door: [''],
      city: [''],
      region: [''],
      country: [''],
      zip: [''],

    });
    // get customer id of new order
     this.newOrderForm.get('customerId').valueChanges.subscribe(value => { console.log(value);
                                                                           this.idCustomer = value; });
  }

  // save new order
  saveNewOrder(): void {

    const p = { ...this.order, ...this.newOrderForm.value };
    p.id = 0;
    p.stateId = 1;
    // get new id to create items order
    this.orderService.createOrder(p)
    .subscribe({
      next: (response) => {this.onSaveComplete();
                           this.newId = response.id;
                          },
      error: err => this.error = err
    });

  }

// set customer address as transport address
  useCustomerAddres(id: number): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (response: ICustomer) => {
      this.customer = response;

      this.newOrderForm.patchValue({
        address: this.customer.address,
        number: this.customer.number,
        flat: this.customer.flat,
        door: this.customer.door,
        city: this.customer.city,
        region: this.customer.region,
        country: this.customer.country,
        zip: this.customer.zip
    });
  },
  error: err => this.error = err
});
}

// manage address transport view
  controlTransport(): void {
    this.showTransport = !this.showTransport;
  }
// return order page
  onBack(): void {
    this.router.navigate(['/orders']);
  }

 // Reset the form to clear the flags
  onSaveComplete(): void {
    // this.newOrderForm.reset();
    this.showButtonItems = true;
      // this.router.navigate(['/orders']);
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


  newItems(): void {
    this.newOrderForm.reset();
    this.router.navigate(['/createItem', 'order', this.newId, '0']);

  }
}
