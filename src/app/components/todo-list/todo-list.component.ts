import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ITodo, ITodoList} from "../../core/models/todo.interface";
import {TodoService} from "../../core/services/todo.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TodoComponent} from "../todo/todo.component";
import {MatTable} from "@angular/material/table";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";

@Component({
  selector: 'payme-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [
    CommonModule,
    TodoComponent,
    MatTable
  ],
})
export class TodoListComponent implements OnInit {
  todos: ITodo;
  destroyRef = inject(DestroyRef)

  constructor(
    private todoService: TodoService,
    private router: Router,
    private toasterService: ToastrService
  ) {
  }


  ngOnInit(): void {
    this.getTodos()
  }

  private getTodos(): void {
    this.todoService.getTodos()
      .pipe(
        filter(res => !!res),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.todos = res;
      })
  }

  delete(todo: ITodoList) {
    this.todoService.deleteTodo(todo.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.getTodos()
        this.toasterService.error(`Todo ${todo.title} Deleted!`, 'Deleted Successfuly');
      })
  }

  edit(todo: ITodoList) {
    this.router.navigate([todo.id])
      .catch()
  }
}
