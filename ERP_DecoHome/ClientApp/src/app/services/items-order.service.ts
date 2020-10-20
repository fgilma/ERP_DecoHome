import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IOrderItem } from '../interfaces/iorder-item';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsOrderService {

  private itemsOrderUrl = 'api/detailedOrders';

  constructor(private http: HttpClient) { }
  // Get items by id
  getItemsOrderById(id: number): Observable<IOrderItem> {
    return this.http.get<IOrderItem>(`${this.itemsOrderUrl}/GetDetailedOrders/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
  // get items order
  getItemsOrder(id: number): Observable<IOrderItem[]> {
    return this.http.get<IOrderItem>(this.itemsOrderUrl + '/GetItemsByOrderId/' + id).pipe(
      tap((data: any) => console.log('All: ' + JSON.stringify(data)),
      catchError(this.handleError))
      );
    }
  // Post item
  createItemsOrder(items: IOrderItem): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.itemsOrderUrl}/`;
    return this.http.post<IOrderItem>(url, items, { headers }).pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
    );
  }

  // Put item
  updateItemsOrder(item: IOrderItem): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.itemsOrderUrl}/${item.id}`;
    return this.http.put<IOrderItem>(url, item, { headers }).pipe(
                tap(() => console.log('updateProduct: ' + item.id)),
        // Return the product on an update
        map(() => item),
        catchError(this.handleError)
      );
  }
// Delete product
 deleteItemOrder(id: number): Observable<{}> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.itemsOrderUrl}/${id}`;
  return this.http.delete<IOrderItem>(url, { headers })
    .pipe(
      tap(data => console.log('deleteProduct: ' + id)),
      catchError(this.handleError)
    );
 }
  // Get totals: sum cost and pvp items belong to same order
  getTotal(id: number): Observable<number[]> {
    return this.http.get<number>(`${this.itemsOrderUrl}/getTotal/${id}`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
 // statistics, sales group by products
  BestSellingProducts(): Observable<any[]> {
    return this.http.get<any>(`${this.itemsOrderUrl}/BestSellingProducts`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }

 /* PostItemOrder(items: IOrderItem): Observable<any> {

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.itemsOrderUrl}/PostItemOrder`;
  return this.http.post<IOrderItem>(url, items, { headers }).pipe(
              tap(data => console.log('createProduct: ' + JSON.stringify(data))),
              catchError(this.handleError)
  );
}*/

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
