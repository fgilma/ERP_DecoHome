import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IEmployee } from '../interfaces/iemployee';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = 'api/account';

  constructor(private http: HttpClient) { }

  // Get employees
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee>(this.employeeUrl).pipe(
      tap((data: any) => console.log('All: ' + JSON.stringify(data)),
      catchError(this.handleError))
      );
    }
 // Get employee by ID
  getEmployeeById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.employeeUrl}/${id}`).pipe(
      tap((data: any) => console.log('All: ' + JSON.stringify(data)),
      catchError(this.handleError))
      );
    }
// Create employee
    create(userInfo: IEmployee): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      // product.id = null;
      return this.http.post<IEmployee>(this.employeeUrl, userInfo, { headers })
        .pipe(
          tap(data => console.log(`createEmployee: ${JSON.stringify(data)}`)),
          catchError(this.handleError)
        );
    }
 // Update employee
    updateEmployee(employee: IEmployee): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.employeeUrl}/${employee.id}`;
      return this.http.put<IEmployee>(url, employee, { headers })
        .pipe(
          tap(() => console.log('updateEmployee: ' + employee.id)),
          // Return the customer on an update
          map(() => employee),
          catchError(this.handleError)
        );
    }
  // Delete employee
  deleteEmployee(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete<IEmployee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }
  // errors
  private handleError(err: HttpErrorResponse): any {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
