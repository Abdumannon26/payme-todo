import {Routes} from '@angular/router';
import {AnonymousUserGuard} from "./core/guards/anonymous-user.guard";
import {AuthenticatedUserGuard} from "./core/guards/authenticated-user.guard";

export const routes: Routes = [
  {
    path: 'login',
    title: 'Логин',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
    canActivate: [AnonymousUserGuard],
  },
  {
    path: '',
    loadChildren: () => import('./components/main/main.routes').then(m => m.main_routes),
    canActivate: [AuthenticatedUserGuard]
  },
];
