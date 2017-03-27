import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataService {

  private apiHeader = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 47491c71-2e40-42ac-82f6-94d87895f914'
    })
  });
  private todoListSubject = new Subject<any[]>();
  todoListObservable: Observable<any>;

  constructor(private http: Http) {
    this.todoListObservable = this.todoListSubject
      .debounceTime(1000)
      .flatMap(data => {
        console.log(data);
        return this.http.post('./me/todomvc', data, this.apiHeader)
          .map(res => {
            return res.json();
          }).catch(err => {
            return Observable.throw('api error');
          });
      });
  }

  getTodoList () {
    return this.http.get('./me/todomvc', this.apiHeader).map(res => {
      return res.json()
    }).catch(err => {
      return Observable.of<any[]>([]);
    });
  }

  saveTodoList (newTodoList: any[]) {
    this.todoListSubject.next(newTodoList);
  }

}
