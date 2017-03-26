import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?';
  todoList: any[] = [];
  todo = '';
  filterType = '';
  toggleAll = false;

  private apiHeader = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 09123582-43ba-4816-9063-cc6c420540b9'
    })
  });

  constructor(private http: Http) {}

  ngOnInit () {
    this.getTodoList().subscribe(data => {
      this.todoList = data;
      this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
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
    let oldTodoList = [...newTodoList];
    this.todoList = newTodoList;
    return this.http.post('./me/todomvc', newTodoList, this.apiHeader)
      .map(res => {
        return res.json();
      }).catch(err => {
        this.todoList = oldTodoList;
        return Observable.of<any[]>(oldTodoList);
      });

  }

  addTodo () {
    if (this.todo) {
      let newTodoList = [...this.todoList];
      newTodoList.push({
        text: this.todo,
        done: false
      });
      this.saveTodoList(newTodoList).subscribe(data => {});
      this.todo = '';
    }
  }

  clearComplete () {
    let newTodoList = this.todoList.filter(item => {
      return !item.done;
    });
    this.saveTodoList(newTodoList).subscribe(data => {});
  }

  filterTypeChange (filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChange (val) {
    let newTodoList = [...this.todoList];
    newTodoList.forEach(item => {
      item.done = val;
    });
    this.saveTodoList(newTodoList).subscribe(data => {});
  }

  todoItemChange (val) {
    let newTodoList = [...this.todoList];
    this.saveTodoList(newTodoList).subscribe(data => {}, err => {
      this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
    });
    this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
  }

  removeTodo (todo) {
    let newTodoList = this.todoList.filter(item => {
      return item != todo;
    });
    this.saveTodoList(newTodoList).subscribe(data => {});
  }
}
