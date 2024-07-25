import {HttpInterceptorFn} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";
import {ToastrService} from "ngx-toastr";

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toasterService = inject(ToastrService);
  const tokenService = inject(TokenService);

  return next(request)
    .pipe(
      catchError(err => {
        toasterService.error(err.error.detail, err.error.message)
        if (err.status === 401) {
          tokenService.logout();
        }
        return throwError(err);
      })
    );
}

