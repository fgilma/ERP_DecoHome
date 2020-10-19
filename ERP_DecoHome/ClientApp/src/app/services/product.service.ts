import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products';

  constructor(private http: HttpClient) { }

  // Get products
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct>(`${this.productUrl}/GetProducts`).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
  // Get product {id}
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.productUrl + '/' + id).pipe(
                tap((data: any) => console.log('All: ' + JSON.stringify(data)),
                catchError(this.handleError))
    );
  }
  // Post product
  createProduct(product: IProduct): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/`;
    return this.http.post<IProduct>(url, product, { headers }).pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
    );
  }
  // Put product
  updateProduct(product: IProduct): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }
  // Delete product
 deleteProduct(id: number): Observable<{}> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.productUrl}/${id}`;
  return this.http.delete<IProduct>(url, { headers })
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
