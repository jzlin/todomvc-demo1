import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint = 'What needs to be done?';
  todoList: any[] = [];
  todo = '';
  filterType = '';
  toggleAll = false;

  constructor(private http: Http) {}

  addTodo () {
    if (this.todo) {
      let newTodoList = [...this.todoList];
      newTodoList.push({
        text: this.todo,
        done: false
      });
      this.todoList = newTodoList;
      this.todo = '';
    }
  }

  clearComplete () {
    this.todoList = this.todoList.filter(item => {
      return !item.done;
    });
  }

  filterTypeChange (filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChange (val) {
    this.todoList.forEach(item => {
      item.done = val;
    });
  }

  todoItemChange (val) {
    this.todoList = [...this.todoList];
    this.toggleAll = this.todoList.filter(item => !item.done).length  === 0;
  }

  removeTodo (todo) {
    this.todoList = this.todoList.filter(item => {
      return item != todo;
    });
  }
}
