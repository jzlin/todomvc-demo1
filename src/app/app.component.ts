import { Component, OnInit } from '@angular/core';
import { DataService } from "app/data.service";

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


  constructor(private dataSvc: DataService) {}

  ngOnInit () {
    this.dataSvc.getTodoList().subscribe(data => {
      this.todoList = data;
      this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
    });
  }

  private saveTodoListToDataSvc (newTodoList: any[]) {
    let oldTodoList = [...newTodoList];
    this.todoList = newTodoList;
    return this.dataSvc.saveTodoList(newTodoList).map(data => {
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
      this.saveTodoListToDataSvc(newTodoList).subscribe(data => {});
      this.todo = '';
    }
  }

  clearComplete () {
    let newTodoList = this.todoList.filter(item => {
      return !item.done;
    });
    this.saveTodoListToDataSvc(newTodoList).subscribe(data => {});
  }

  filterTypeChange (filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChange (val) {
    let newTodoList = [...this.todoList];
    newTodoList.forEach(item => {
      item.done = val;
    });
    this.saveTodoListToDataSvc(newTodoList).subscribe(data => {});
  }

  todoItemChange () {
    let newTodoList = [...this.todoList];
    this.saveTodoListToDataSvc(newTodoList).subscribe(data => {}, err => {
      this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
    });
    this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
  }

  removeTodo (todo) {
    let newTodoList = this.todoList.filter(item => {
      return item != todo;
    });
    this.saveTodoListToDataSvc(newTodoList).subscribe(data => {});
  }

  enterEditMode (item) {
    item.editText = item.text;
    item.editMode = true;
  }

  editComplete (item) {
    item.text = item.editText;
    item.editMode = false;
    this.todoItemChange();
  }

  editCancel (item) {
    item.editMode = false;
    this.todoItemChange();
  }
}
