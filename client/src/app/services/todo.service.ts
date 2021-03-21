import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';



const baseUrl = 'http://localhost:8080/api/todos';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(baseUrl);
  }

  createTodo(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

  deleteTodos(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
