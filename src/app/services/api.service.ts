import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _http:HttpClient) { }





  getTodos(page: number = 1, pageSize: number = 5): Observable<Todo[]>{
    let params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', pageSize.toString());
    return this._http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10', { params });
  }
   



}

