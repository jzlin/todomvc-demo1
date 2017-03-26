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
      this.todoList.push(this.todo);
      this.todo = '';
    }
  }
}
