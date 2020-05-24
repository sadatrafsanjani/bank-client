import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, switchMap, filter, take} from 'rxjs/operators';
import {LoginResponse} from '../response/login-response';
import {RefreshTokenPayload} from '../payload/refresh-token-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  refreshTokenPayload: RefreshTokenPayload;

  constructor(public authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('refresh') !== -1 ||
      req.url.indexOf('login') !== -1 ||
      req.url.indexOf('logout') !== -1 ||
      req.url.indexOf('check') !== -1 ||
      req.url.indexOf('password') !== -1) {

      return next.handle(req);
    }

    const jwtToken = this.authenticationService.getJwtToken();

    if (jwtToken){

      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(
        error => {

          if (error instanceof HttpErrorResponse && error.status === 403) {
            return this.handleAuthErrors(req, next);
          } else {
            return throwError(error);
          }
        }
      ));
    }

    return next.handle(req);
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isTokenRefreshing) {

      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.refreshTokenPayload.username = this.authenticationService.getUserName();
      this.refreshTokenPayload.refreshToken = this.authenticationService.getRefreshToken();

      return this.authenticationService.refreshToken(this.refreshTokenPayload).pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {

          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.loginToken);

          return next.handle(this.addToken(req, refreshTokenResponse.loginToken));
        })
      );
    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {

          return next.handle(this.addToken(req, this.authenticationService.getJwtToken()));
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + jwtToken)
    });
  }
}
