import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random';

@Injectable({
  providedIn: 'root'
})
export class CatFactsService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<any> {
    const params = new HttpParams({ fromObject: { animal_type: 'dog', amount: '3' } });
    return this.http.get(baseUrl, { params })
  }
}
