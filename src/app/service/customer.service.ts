import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerResponse} from '../response/customer-response';
import {CustomerPayload} from '../payload/customer-payload';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  createCustomer(payload: CustomerPayload): Observable<any> {

    return this.http.post(this.url, payload, {responseType: 'text'});
  }

  getCustomerByAccountNo(accountNo: string): Observable<CustomerResponse> {

    return this.http.get<CustomerResponse>(this.url + '/customer/account/' + accountNo);
  }

  getCustomers(): Observable<Array<CustomerResponse>> {

    return this.http.get<Array<CustomerResponse>>(this.url);
  }

  getCustomer(id: number): Observable<CustomerResponse> {

    return this.http.get<CustomerResponse>(this.url + '/' + id);
  }

  checkCustomerAccountNo(accountNo: string): Observable<boolean> {

    const payload = {
      accountNo
    };

    return this.http.post(this.url + '/customer/account/validity', payload, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      )
    );
  }
}
