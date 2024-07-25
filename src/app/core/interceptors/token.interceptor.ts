import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";


export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  let headers = {};
  let token = inject(TokenService).getTokens()
  if (!request.url.includes('login')) {
    headers = {
      'Access-Control-Allow-Origin': '*',
      charset: 'utf-8',
      setHeaders: {
        Authorization: `Token ${token}`,
        ...headers
      }
    };
  }

  const tokenReq = request.clone(headers);
  return next (tokenReq);

}
