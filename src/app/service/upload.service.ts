import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url = 'http://localhost:8080/api/uploads';

  constructor(private http: HttpClient) {}

  uploadFiles(id: number, payload: FormData): Observable<any> {

    return this.http.put(this.url + '/' + id, payload, {observe: 'response'});
  }
}
