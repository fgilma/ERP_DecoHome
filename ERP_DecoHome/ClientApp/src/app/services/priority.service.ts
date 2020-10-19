import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IPriority } from '../interfaces/ipriority';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private priorityUrl =  'api/priorities/';

  constructor(private http: HttpClient) { }

  // Get priorities
  getPriorities(): Observable<IPriority[]> {
    return this.http.get<IPriority>(this.priorityUrl).pipe(
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
