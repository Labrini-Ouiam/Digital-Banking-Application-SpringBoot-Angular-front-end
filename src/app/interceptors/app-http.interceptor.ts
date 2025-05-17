import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log(req.url);

  const newRequest = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken)
  });

  return next(newRequest);
};
