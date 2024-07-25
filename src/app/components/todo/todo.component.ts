import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {ITodoList} from "../../core/models/todo.interface";
import {TodoService} from "../../core/services/todo.service";
import {ToastrService} from "ngx-toastr";
import {CommonModule, DatePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {filter, finalize} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'payme-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  imports: [
    CommonModule,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    FormsModule,
  ]
})
export class TodoComponent {
  @Input() todo: ITodoList;
  @Output() delete: EventEmitter<ITodoList> = new EventEmitter<ITodoList>();
  @Output() edit: EventEmitter<ITodoList> = new EventEmitter<ITodoList>();

  loading: boolean;
  destroyRef = inject(DestroyRef)

  constructor(
    private todoService: TodoService,
    private toasterService: ToastrService
  ) {
  }

  onChange(todo: ITodoList): void {
    this.loading = true;
    let formData = {
      title: todo.title,
      completed: todo.completed,
      user: todo.user,
    }
    this.todoService.editTodo(formData, todo.id)
      .pipe(
        filter(res => !!res),
        finalize(() => this.loading = false),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.toasterService.success(`Todo succesfully completed`, 'completed');
      })
  }

}
