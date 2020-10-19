import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AccountService } from '../../services/account.service';
import { IEmployee } from '../../interfaces/iemployee';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  title: string;
  employee: IEmployee;
  error: string;
  isNew: boolean;
  // password and email regex patterns
  pwdPattern  = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private account: AccountService) { }
 ngOnInit(): void {
    // employee form
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [''],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
      rol: ['', Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');
    // new employee
    if (id === null) {
      this.title = 'Crear ';
      this.isNew = true;
    // edit employee
    } else {
      this.title = 'Editar ';
      this.isNew = false;
      this.employeeService.getEmployeeById(id).subscribe({
        next: (response: IEmployee) => {
          this.employee = response;
          // show data  employee on the form
          this.employeeForm.patchValue({
              name: this.employee.name,
              surname1: this.employee.surname1,
              surname2: this.employee.surname2,
              email: this.employee.email,
              department: this.employee.department,
              position: this.employee.position,
              salary: this.employee.salary,
              password: this.employee.password,
              rol: this.employee.rol
            });
        },
        error: err => this.error = err
      });
    }
 }
  saveEmployee(): void {
    const p = { ...this.employee, ...this.employeeForm.value };
    p.username = p.email;
    const id = +this.route.snapshot.paramMap.get('id');
    // post new employee
    if (id === 0) {
      this.employeeService.create(p).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    } else {
      // update employee
      this.employeeService.updateEmployee(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.employeeForm.reset();
    this.router.navigate(['/employees']);
  }
}
