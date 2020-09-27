import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.scss']
})
export class NewTodoDialogComponent implements OnInit {

  title: string
  dueDate: Date = new Date()

  constructor(private dialogRef: MatDialogRef<NewTodoDialogComponent>) { }

  ngOnInit(): void {
    this.dueDate.setDate(new Date().getDate() + 1)
  }

  createNewTodo() {
    const item = {
      id: null,
      createdAt: null,
      dueDate: this.dueDate,
      title: this.title,
      statuses: null
    };
    this.dialogRef.close(item)
  }
}
