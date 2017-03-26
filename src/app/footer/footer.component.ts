import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _todos: any[] = [];

  @Input('todoList')
  set todos(val: any[]) {
    this._todos = val;
    this.tooMore = this.todos.length > 5;
  }
  get todos():any[] {
    return this._todos;
  }

  tooMore = false;

  constructor() { }

  ngOnInit() {
  }

}
