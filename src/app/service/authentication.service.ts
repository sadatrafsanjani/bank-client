import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from '../payload/register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from '../payload/login-payload';
import {map, tap} from 'rxjs/operators';
import {LoginResponse} from '../response/login-response';
import {RefreshTokenPayload} from '../payload/refresh-token-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/api/authentication';

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  register(payload: RegisterPayload): Observable<any> {

    return this.http.post(this.url + '/register', payload, {responseType: 'text'});
  }

  login(payload: LoginPayload): Observable<boolean> {

    return this.http.post<LoginResponse>(this.url + '/login', payload).pipe(map (response => {

        this.storage.store('id', response.id);
        this.storage.store('username', response.username);
        this.storage.store('roles', response.roles);
        this.storage.store('loginToken', response.loginToken);
        this.storage.store('refreshToken', response.refreshToken);
        this.storage.store('expiresAt', response.expiresAt);
        this.storage.store('picture', response.picture);
        this.storage.store('pages', response.pages);

        return true;
      }
    ));

  }

  logout(): Observable<any> {

    const payload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    return this.http.post(this.url + '/logout', payload, {responseType: 'text'}).pipe(map(data => {
      this.storage.clear('id');
      this.storage.clear('username');
      this.storage.clear('roles');
      this.storage.clear('loginToken');
      this.storage.clear('refreshToken');
      this.storage.clear('expiresAt');
      this.storage.clear('picture');
      this.storage.clear('pages');

      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.storage.retrieve('username') != null;
  }

  isNotAuthenticated(): boolean {
    return this.storage.retrieve('username') == null;
  }

  getId() {

    return this.storage.retrieve('id');
  }

  isAdmin(): boolean {

    const roles = this.storage.retrieve('roles');

    return roles.indexOf(1) > -1 ? true : false;
  }

  isUser(): boolean {

    const roles = this.storage.retrieve('roles');

    return roles.indexOf(2) > -1 ? true : false;
  }

  getJwtToken() {

    return this.storage.retrieve('loginToken');
  }

  getRefreshToken() {

    return this.storage.retrieve('refreshToken');
  }

  getUserName() {

    return this.storage.retrieve('username');
  }

  loadProfilePicture() {

    return this.storage.retrieve('picture');
  }

  setProfilePicture(picture: []){

    this.storage.clear('picture');
    this.storage.store('picture', picture);

  }

  refreshToken(refreshTokenPayload: RefreshTokenPayload) {

    return this.http.post<LoginResponse>(this.url + '/refresh', refreshTokenPayload).pipe(tap(
      response => {
        this.storage.store('authenticationToken', response.loginToken);
        this.storage.store('expiresAt', response.expiresAt);
      }
      )
    );
  }

  checkUsername(username: string): Observable<boolean> {

    const payload = {
      username
    };

    return this.http.post(this.url + '/check/username', payload, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      ));
  }

  checkEmail(email: string): Observable<boolean> {

    const payload = {
      email
    };

    return this.http.post(this.url + '/check/email', payload, {observe: 'response'}).pipe(
      map(data => {
          return (data.status === 200) ? true : false;
        }
      ));
  }

  isAllowed(id: number){

    const pages = this.storage.retrieve('pages');

    return pages.indexOf(id) > -1 ? true : false;
  }
}
