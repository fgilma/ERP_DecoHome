import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ICustomer } from '../interfaces/icustomer';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl =  'api/customers';

  constructor(private http: HttpClient) { }

  // Get customer by id
  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.customerUrl}/getcustomers/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
  // Get customers
  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer>(`${this.customerUrl}/getcustomers`).pipe(
      tap((data: any) => console.log('All: ' + JSON.stringify(data)),
      catchError(this.handleError))
      );
  }
  // Create customer
  createCustomer(customer: ICustomer): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // product.id = null;
    return this.http.post<ICustomer>(this.customerUrl, customer, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // Update customer
  updateCustomer(customer: ICustomer): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.customerUrl}/${customer.id}`;
    return this.http.put<ICustomer>(url, customer, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + customer.id)),
        // Return the customer on an update
        map(() => customer),
        catchError(this.handleError)
      );
  }
 // Delete customer
    deleteCustomer(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.customerUrl}/${id}`;
      return this.http.delete<ICustomer>(url, { headers })
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
