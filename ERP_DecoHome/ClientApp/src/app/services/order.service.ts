import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'api/orders';

  constructor(private http: HttpClient) { }

  // Get all orders
  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder>(`${this.orderUrl}/GetOrders`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
 // Get order by Employee
  getOrderByEmployee(id: string): Observable<IOrder[]> {
    return this.http.get<IOrder>(`${this.orderUrl}/GetOrderByCustomer/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
                );
              }
   // Get order by Id
  getOrderById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.orderUrl}/GetOrders/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
  // Delete order and its items
  deleteOrder(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.orderUrl}/DeleteOrderItems/${id}`;
    return this.http.delete<IOrder>(url, { headers })
      .pipe(
        tap(data => console.log('deleteOrder: ' + id)),
        catchError(this.handleError)
      );
  }
  // Create order
  createOrder(order: IOrder): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IOrder>(this.orderUrl, order, { headers })
      .pipe(
        tap(data => console.log('createOrder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // Update order
  updateOrder(order: IOrder): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.orderUrl}/${order.id}`;
    return this.http.put<IOrder>(url, order, { headers })
    .pipe(
        tap(() => console.log('updateOrder: ' + order.id)),
        // Return the customer on an update
        map(() => order),
        catchError(this.handleError)
      );
  }
  // statistics, get sales group by day
  getSalesByDay(): Observable<any[]> {
    return this.http.get<any>(this.orderUrl + '/salesByDay').pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
 // get sales by customerId
  getSalesByCustomerId(id: number): Observable<any[]> {
    return this.http.get<any>(`${this.orderUrl}/salesByCustomerId/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
 // statistics, get sales group by customers
  getSalesByCustomer(): Observable<any[]> {
    return this.http.get<any>(`${this.orderUrl}/salesByCustomer`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
 // statistics, get sales group by employees
  getSalesByEmployee(): Observable<any[]> {
    return this.http.get<any>(`${this.orderUrl}/salesByEmployee`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }

  // Errors
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
