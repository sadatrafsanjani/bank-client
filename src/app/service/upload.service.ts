import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UploadResponse} from '../response/upload-response';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url = 'http://localhost:8080/api/uploads';

  constructor(private http: HttpClient) {}

  getUploadByCustomerId(id: number): Observable<UploadResponse> {

    return this.http.get<UploadResponse>(this.url + '/' + id);
  }

  uploadFiles(id: number, payload: FormData): Observable<any> {

    return this.http.put(this.url + '/' + id, payload, {observe: 'response'});
  }

  updateNid(id: number, payload: FormData): Observable<any> {

    return this.http.put(this.url + '/nid/' + id, payload, {observe: 'response'});
  }

  updatePicture(id: number, payload: FormData): Observable<any> {

    return this.http.put(this.url + '/picture/' + id, payload, {observe: 'response'});
  }
}
