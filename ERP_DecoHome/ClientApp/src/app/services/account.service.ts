import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IuserInfo } from '../interfaces/iuser-info';
import { IEmployee } from '../interfaces/iemployee';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = 'api/account';

  constructor(private http: HttpClient) { }

  // login
   login(userInfo: IuserInfo): Observable<any> {
      return this.http.post<any>(this.apiURL + '/Login', userInfo).pipe(
        catchError(this.handleError)
        );
      }
    // get  current user
    getEmployeeByUser(user: string): Observable<IEmployee> {
      return this.http.get<IEmployee>(`${this.apiURL}/currentUser/${user}`).pipe(
        tap((data: any) => console.log('All: ' + JSON.stringify(data)),
        catchError(this.handleError))
        );
      }
    // use localstorage to save token in browser
    getToken(): string {
      return localStorage.getItem('token');
    }

    getExpirationToken(): string {
      return localStorage.getItem('tokenExpiration');
      }

    // return islogged false if token time has finished
    isLogged(): boolean {

      const exp = this.getExpirationToken();
      if (!exp) {
        // token doesnt exist
        return false;
      }
      const now = new Date().getTime();
      const dateExp = new Date(exp);

      if (now >= dateExp.getTime()) {
        // finished token
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return false;
      } else {
        return true;
      }
    }
    // remove values on localStorage
    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration'); // token has limit time
      localStorage.removeItem('rol');
      localStorage.removeItem('userName');
      localStorage.removeItem('id');
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
        if (err.status === 401){
          errorMessage = 'Error en el login';
        }
        else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${JSON.stringify(err.message)}`;
      }
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}
