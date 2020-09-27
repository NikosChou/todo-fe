import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item, Status } from '../model/model';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: Item
  @Output() completed = new EventEmitter()
  @Output() update = new EventEmitter()
  @Output() delete = new EventEmitter()

  edit: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  updateItem() {
    this.update.emit(this.item)
    this.edit = false
  }

}
