import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import * as toastr from "toastr";

@Injectable()
export class DataService {

  private apiHeader = new RequestOptions({
    headers: new Headers({
      'authorization': 'token a0be69e3-84bd-4998-adaf-d7def77e21a2'
    })
  });
  private todoListSubject = new Subject<any[]>();
  todoListObservable: Observable<any>;
  private oldData = [];

  constructor(private http: Http) {
    toastr.options.preventDuplicates = true;
    this.todoListObservable = this.todoListSubject
      .do(data => {
        toastr.info("data saving...")
        let oldTodoList = data[1];
        if (this.oldData.length === 0) {
          this.oldData = oldTodoList;
        }
      })
      .debounceTime(1000)
      .flatMap(data => {
        let newTodoList = data[0];
        return this.http.post('./me/todomvc', newTodoList, this.apiHeader)
          .map(res => {
            toastr.success("data saved");
            this.oldData = [];
            return res.json();
          }).catch(err => {
            toastr.error('api error');
            return Observable.throw(this.oldData);
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

  saveTodoList (newTodoList: any[], oldTodoList: any[]) {
    this.todoListSubject.next([newTodoList, oldTodoList]);
  }

}
