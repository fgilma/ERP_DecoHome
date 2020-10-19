import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/icustomer';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  title: string;
  customer: ICustomer;
  error: string;
  customerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
 // form
  this.customerForm = this.fb.group({
      name: ['', Validators.required],
      dni: ['', Validators.required],
      phone: [''],
      emailCustomer: [''],
      address: [''],
      number: [''],
      flat: [''],
      door: [''],
      city: [''],
      region: [''],
      country: [''],
      zip: ['']
    });
  const id = +this.route.snapshot.paramMap.get('id');
  // create new customer
  if (id === 0) {
    this.title = 'Crear ';
  // edit customer
  } else {
    this.title = 'Editar ';

    this.customerService.getCustomerById(id).subscribe({
      next: (response: ICustomer) => {
          this.customer = response;
          // show customer data on the form
          this.customerForm.patchValue({
            name: this.customer.name,
            address: this.customer.address,
            flat: this.customer.flat,
            door: this.customer.door,
            zip: this.customer.zip,
            region: this.customer.region,
            city: this.customer.city,
            country: this.customer.country,
            phone: this.customer.phone,
            number: this.customer.number,
            emailCustomer: this.customer.emailCustomer,
            dni: this.customer.dni
        });
      },
      error: err => this.error = err
    });
   }
  }


  saveCustomer(): void {
    const p = { ...this.customer, ...this.customerForm.value };

    const id = +this.route.snapshot.paramMap.get('id');

    if (id === 0) {
      this.customerService.createCustomer(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    } else {
      this.customerService.updateCustomer(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.customerForm.reset();
    this.router.navigate(['/customers']);
  }
}
