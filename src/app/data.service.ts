import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private apiHeader = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 09123582-43ba-4816-9063-cc6c420540b9'
    })
  });

  constructor(private http: Http) { }

  getTodoList () {
    return this.http.get('./me/todomvc', this.apiHeader).map(res => {
      return res.json()
    }).catch(err => {
      return Observable.of<any[]>([]);
    });
  }

  saveTodoList (newTodoList: any[]) {
    return this.http.post('./me/todomvc', newTodoList, this.apiHeader)
      .map(res => {
        return res.json();
      }).catch(err => {
        return Observable.throw('api error');
      });

  }

}
