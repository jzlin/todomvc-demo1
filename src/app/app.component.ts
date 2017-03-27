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
      this.initToggleAll();
    });
    this.subscribeTodo();
  }

  private initToggleAll () {
    this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
  }

  private subscribeTodo () {
    this.dataSvc.todoListObservable
      .subscribe(data => {}, err => {
        this.dataSvc.getTodoList().subscribe(data => {
          this.todoList = data;
        });
        this.initToggleAll();
      });
  }

  private saveTodoListToDataSvc (newTodoList: any[]) {
    this.todoList = newTodoList;
    this.dataSvc.saveTodoList(newTodoList);
  }

  addTodo () {
    if (this.todo) {
      let newTodoList = [...this.todoList];
      newTodoList.push({
        text: this.todo,
        done: false
      });
      this.saveTodoListToDataSvc(newTodoList);
      this.todo = '';
    }
  }

  clearComplete () {
    let newTodoList = this.todoList.filter(item => {
      return !item.done;
    });
    this.saveTodoListToDataSvc(newTodoList);
  }

  filterTypeChange (filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChange (val) {
    let newTodoList = [...this.todoList];
    newTodoList.forEach(item => {
      item.done = val;
    });
    this.saveTodoListToDataSvc(newTodoList);
  }

  todoItemChange () {
    let newTodoList = [...this.todoList];
    this.saveTodoListToDataSvc(newTodoList);
  }

  removeTodo (todo) {
    let newTodoList = this.todoList.filter(item => {
      return item != todo;
    });
    this.saveTodoListToDataSvc(newTodoList);
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
