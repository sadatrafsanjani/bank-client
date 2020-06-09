import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  private url = 'http://localhost:8080/actuator';

  constructor(private http: HttpClient) {}

  health(): Observable<any> {

    return this.http.get(this.url + '/health');
  }
}
