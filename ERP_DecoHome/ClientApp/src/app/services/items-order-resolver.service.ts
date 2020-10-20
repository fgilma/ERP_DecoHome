import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IOrderItem } from '../interfaces/iorder-item';
import { ItemsOrderService } from './items-order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsOrderResolverService implements Resolve<IOrderItem[]>{

  constructor(private itemsOrderService: ItemsOrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderItem[]> {
            const orderId = route.paramMap.get('id');
            return this.itemsOrderService.getItemsOrder(+orderId).pipe(
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
