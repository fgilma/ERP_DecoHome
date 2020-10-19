import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IState } from '../interfaces/istate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

private stateUrl = 'api/states/';

constructor(private http: HttpClient) { }

// Get states
getStates(): Observable<IState[]> {
    return this.http.get<IState>(this.stateUrl).pipe(
                tap((data: any ) => console.log('All: ' + JSON.stringify(data)),
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
