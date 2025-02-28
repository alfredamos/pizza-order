import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  //----> Clone request.
  const request = req.clone({
    withCredentials: true,
  });

  console.log("In interceptor, request : ", request)

  return next(request);
};
