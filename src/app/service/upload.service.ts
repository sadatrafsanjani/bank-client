import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UploadPayload} from '../payload/upload-payload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url = 'http://localhost:8080/api/uploads';

  constructor(private http: HttpClient) {}

  uploadFiles(payload: UploadPayload): Observable<any> {

    return this.http.post(this.url, payload, {responseType: 'text'});
  }
}
