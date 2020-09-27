import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('titleInput') titleInput: ElementRef;
  title: string

  edit: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.title = this.item.title
  }

  save(event) {
    this.updateItem()
    event.stopPropagation()
  }

  updateItem() {
    this.item.title = this.title
    this.update.emit(this.item)
    this.edit = false
  }

  setEdit() {
    this.edit = true
  }
}
