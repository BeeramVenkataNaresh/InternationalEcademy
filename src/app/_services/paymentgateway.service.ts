import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiPath = environment.apiPath + 'paymentgateway';

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

  post(url: string) {
    return this.httpClient.post<any>(apiPath + '/paymentGateway', url);
  }
}
