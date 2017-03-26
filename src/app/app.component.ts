import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint = 'What needs to be done?';
  todoList: any[] = [];
  todo = '';

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
}
