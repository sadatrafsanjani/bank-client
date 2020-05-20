import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuPayload} from '../payload/menu-payload';
import {Observable} from 'rxjs';
import {RoleResponse} from '../response/role-response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Array<RoleResponse>> {

    return this.http.get<Array<RoleResponse>>(this.url);
  }

  updateMenu(id: number, payload: MenuPayload){

    return this.http.put(this.url + '/assign/menus/' + id, payload);
  }
}
