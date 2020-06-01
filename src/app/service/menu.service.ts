import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MenuResponse} from '../response/menu-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Array<MenuResponse>>{
    return this.http.get<Array<MenuResponse>>(this.url);
  }

  getUserMenus(): Observable<Array<MenuResponse>>{
    return this.http.get<Array<MenuResponse>>(this.url + '/user');
  }

}
