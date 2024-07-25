import {Injectable} from '@angular/core';
import {ITodo, ITodoForm, ITodoList} from "../models/todo.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${env.apiUrl}/todo`;

  constructor(
    private _http: HttpClient,
  ) {
  }

  getTodos(): Observable<ITodo> {
    return this._http.get<ITodo>(`${this.apiUrl}/`);
  }

  getTodo(todoId: string): Observable<ITodoList> {
    return this._http.get<ITodoList>(`${this.apiUrl}/${todoId}/`);
  }

  createTodo(formData: ITodoForm): Observable<ITodoList> {
    return this._http.post<ITodoList>(`${this.apiUrl}/`, formData);
  }

  editTodo(formData: ITodoForm, todoId: string): Observable<ITodoList> {
    return this._http.put<ITodoList>(`${this.apiUrl}/${todoId}/`, formData);
  }

  deleteTodo(todoId: string): Observable<ITodoList> {
    return this._http.delete<ITodoList>(`${this.apiUrl}/${todoId}/`);
  }
}
