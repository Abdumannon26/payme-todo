import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoService} from "../../core/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {filter, Observable} from "rxjs";
import {ValidatorComponent} from "../validator/validator.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ITodoList} from "../../core/models/todo.interface";

@Component({
  selector: 'payme-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidatorComponent
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;
  todoId = this.route.snapshot.params['id']
  destroyRef = inject(DestroyRef)

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService
  ) {
  }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.createForm();
    if (this.todoId) {
      this.getTodoDetail()
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    let obv: Observable<ITodoList>
    if (this.todoId) {
      obv = this.todoService.editTodo(this.form.value, this.todoId)
    } else {
      obv = this.todoService.createTodo(this.form.value)
    }
    obv
      .pipe(
        filter(res => !!res),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.toasterService.success(`Todo succesfully completed`, 'completed');
        this.router.navigate(['list'])
          .catch()

      })
  }

  private getTodoDetail(): void {
    this.todoService.getTodo(this.todoId)
      .pipe(
        filter(res => !!res),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.form.patchValue(res)
      })
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      completed: [false],
      user: [1],
    })
  }
}
