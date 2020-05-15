import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionPayload} from '../payload/transaction-payload';
import {BalanceResponse} from '../response/balance-response';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private url = 'http://localhost:8080/api/balances';

  constructor(private http: HttpClient) {}

  checkCurrentBalance(accountNo: string): Observable<BalanceResponse> {

    return this.http.get<BalanceResponse>(this.url + '/balance/' + accountNo);
  }

  checkTransactionHistory(accountNo: string): Observable<Array<BalanceResponse>> {

    return this.http.get<Array<BalanceResponse>>(this.url + '/history/' + accountNo);
  }

  deposit(payload: TransactionPayload): Observable<any> {

    return this.http.post(this.url + '/debit', payload, {responseType: 'text'});
  }

  withdraw(payload: TransactionPayload): Observable<any> {

    return this.http.post(this.url + '/credit', payload, {responseType: 'text'});
  }

}
