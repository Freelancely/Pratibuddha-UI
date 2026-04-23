import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isToastrShown = false;

  constructor(
    private toastrService: ToastrService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authExcludedUrls = [
      '/api/user/login',
      // '/api/user/register',
      '/api/user/forgot-password',
      '/api/shop',
      '/api/products',
      '/api/coupons',
      '/api/contact',
      '/api/home',
      '/api/electronics',
      '/api/product',
      // '/api/cart/cart-items',
      // '/api/cart/add-to-cart',
      // '/api/cart/remove-item',
      // '/api/cart/remove-all',
      // '/api/cart/increase-quantity',
      // '/api/cart/decrease-quantity',
      '/api/notification',
      // '/api/wishlist',
    ];

    const isItExcluded = authExcludedUrls.some((url) =>
      new RegExp(`^${url}(/.*)?$`).test(req.url)
    );

    let authReq = req;
    const token = localStorage.getItem('token');

    if (!isItExcluded && token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isItExcluded && token) {
          if (!this.isToastrShown) {
            this.isToastrShown = true;
            this.toastrService.error('Session expired. Please login again.');
            localStorage.clear();
            this.router.navigate(['/pages/login']);
            setTimeout(() => this.isToastrShown = false, 2000);
          }
        } else if (error.status !== 401) {
          this.toastrService.error(
            error.error?.message || 'An error occurred.'
          );
        }
        return throwError(() => error);
      })
    );
  }
}
