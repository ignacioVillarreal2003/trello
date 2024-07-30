import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const authorization: string = `Bearer ${authService.getToken()}`;

  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: authorization
    }
  });
  return next(modifiedRequest);
};
