import {Routes} from "@angular/router";

export const main_routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main.component').then(c => c.MainComponent),
    children: [
      {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
      },
      {
        path: 'add',
        title: 'Добавление задач',
        loadComponent: () => import('./../todo-form/todo-form.component').then(c => c.TodoFormComponent)
      },
      {
        path: 'list',
        title: 'Список задач',
        loadComponent: () => import('./../todo-list/todo-list.component').then(c => c.TodoListComponent)
      },
      {
        path: ':id',
        title: 'Редактирование задачи',
        loadComponent: () => import('./../todo-form/todo-form.component').then(c => c.TodoFormComponent)
      },
    ]
  }
];
