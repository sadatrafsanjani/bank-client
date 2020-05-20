import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PasswordPayload} from '../payload/password-payload';
import {UserResponse} from '../response/user-response';
import {map} from 'rxjs/operators';
import {MenuPayload} from '../payload/menu-payload';
import {AllowedMenuResponse} from '../response/allowed-menu-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Array<UserResponse>> {

    return this.http.get<Array<UserResponse>>(this.url + '/employees');
  }

  getUsers(): Observable<Array<UserResponse>> {

    return this.http.get<Array<UserResponse>>(this.url);
  }

  getUser(id: number): Observable<UserResponse> {

    return this.http.get<UserResponse>(this.url + '/' + id);
  }

  changePassword(id: number, payload: PasswordPayload): Observable<any> {

    return this.http.put(this.url + '/change/password/' + id, payload);
  }

  activateUser(id: number): Observable<any> {

    return this.http.get(this.url + '/activate/' + id, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      ));
  }

  deactivateUser(id: number): Observable<any> {

    console.log(id);
    return this.http.get(this.url + '/deactivate/' + id, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      ));
  }

  getAllowedMenus(id: number): Observable<Array<AllowedMenuResponse>> {

    return this.http.get<Array<AllowedMenuResponse>>(this.url + '/allowed/menus/' + id);
  }

  updateMenu(id: number, payload: MenuPayload){

    return this.http.put(this.url + '/assign/menus/' + id, payload);
  }
}
