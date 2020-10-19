import { HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private accountService: AccountService) { }

intercept(request: HttpRequest<any>, next: HttpHandler):
 Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = this.accountService.getToken();
    request = request.clone({
      setHeaders: { Authorization: 'bearer ' + token }
    });
    return next.handle(request);
  }
}
