import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoDialogComponent } from '../new-todo-dialog/new-todo-dialog.component';

@Component({
  selector: 'app-new-todo',
  template: '<button mat-fab (click)="openDialog()" color="primary" style="font-size: 3rem;">+</button>'
})
export class NewTodoComponent implements OnInit {
  @Output() newTodo = new EventEmitter();
  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }

  openDialog() {
    const dialog = this.dialog.open(NewTodoDialogComponent);
    dialog.afterClosed().subscribe(
      data => this.newTodo.emit(data)
    );
  }

}
