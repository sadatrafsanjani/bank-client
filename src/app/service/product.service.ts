import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductResponse} from '../response/product-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<ProductResponse>> {

    return this.http.get<Array<ProductResponse>>(this.url);
  }
}
