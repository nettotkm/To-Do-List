import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://apilayer.net/api/check';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  response: object = {};

  constructor(private http: HttpClient) { }

  validate(email: string): Observable<any> {
    const params = new HttpParams({ fromObject: { email: email, access_key: '48772b85d6be2a5327c0edffb9f1a4f1' } });
    return this.http.get(baseUrl, { params })
  }
}
