import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiPath = environment.apiPath + 'paymentgateway/createOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentgatewayService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createOrder(data): Observable<any> {
    return this.httpClient.post<any>(apiPath, data);
  }
}
