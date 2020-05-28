import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PasswordPayload} from '../payload/password-payload';
import {UserResponse} from '../response/user-response';
import {map} from 'rxjs/operators';
import {PictureResponse} from '../response/picture-response';

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

  getUserProfilePicture(id: number): Observable<PictureResponse> {

    return this.http.get<PictureResponse>(this.url + '/picture/' + id);
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

    return this.http.get(this.url + '/deactivate/' + id, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      ));
  }

  updatePicture(id: number, payload: FormData): Observable<any> {

    return this.http.put(this.url + '/picture/' + id, payload, {observe: 'response'});
  }
}
