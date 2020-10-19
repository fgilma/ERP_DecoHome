import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../interfaces/iemployee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[];
  error: string;
  p = 1;

  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit(): void {
    // get employees
    this.employeeService.getEmployees().subscribe({
      next: response => this.employees = response,
      error: err => this.error = err
  });
  }
  create(): void {
    this.router.navigate(['/createEmployee']);

  }

  deleteEmployee(id: string): void {
    console.log(id);
    if (confirm(`Really delete the customer:?`)) {
      this.employeeService.deleteEmployee(id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    }
  }
// return true if user has admin rol
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'Administrador';

  }
  onSaveComplete(): void {
    // update template after changes
    this.employeeService.getEmployees().subscribe({
      next: response => this.employees = response,
      error: err => this.error = err
    });
  }
}
