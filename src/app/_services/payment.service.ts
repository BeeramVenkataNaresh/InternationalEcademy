import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiPath = environment.apiPath + 'payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

   httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    
      constructor(private httpClient: HttpClient) { }
    
      // Get all data
      getAll(): Observable<any> {
        return this.httpClient.get(apiPath + '/getAll');
      }
    
      // Get By Id
      getById(id): Observable<any> {
        return this.httpClient.get(apiPath + '/getById/' + id);
      }
    
      // Get By Query
      getByQuery(fromDate, toDate, custId, productId, accId, paymodeId): Observable<any> {
        return this.httpClient.get(apiPath + '/getByQuery/' + fromDate + '/' + toDate + '/' + custId + '/' + productId + '/' + accId + '/' + paymodeId);
      }
    
      // Create new data
      create(data): Observable<any> {
        return this.httpClient.post(apiPath + '/create', data);
      }
    
      // Modify data by Id
      update(id, data): Observable<any> {
        return this.httpClient.patch(apiPath + '/update/' + id, data);
      }
    
      // Delete data by Id
      delete(id): Observable<any> {
        return this.httpClient.delete(apiPath + '/delete/' + id);
      }
}
