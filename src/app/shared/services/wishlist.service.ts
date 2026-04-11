import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IProduct } from '@/types/product-type';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface WishlistItem {
  wishlistId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  productPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlist`;
  private wishlistCache: WishlistItem[] | null = null;
  private isLoading = false;

  constructor(
    private http: HttpClient,
    public toastrService: ToastrService,
    private router: Router
  ) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getWishlistProducts(token: string): Observable<WishlistItem[]> {
    if (this.wishlistCache && !this.isLoading) {
      console.log('WishlistService: Returning cached wishlist'); // Debug
      return of(this.wishlistCache);
    }

    if (this.isLoading) {
      console.log('WishlistService: Already loading, returning empty observable'); // Debug
      return of([]);
    }

    this.isLoading = true;
    return this.http.get<{ success: boolean; message: WishlistItem[] }>(this.apiUrl, { headers: this.getHeaders(token) })
      .pipe(
        tap(response => {
          if (response.success) {
            this.wishlistCache = response.message;
            localStorage.setItem('wishlist_products', JSON.stringify(response.message));
            console.log('WishlistService: Cache updated', this.wishlistCache); // Debug
          }
          this.isLoading = false;
        }),
        map(response => response.message),
        catchError(error => {
          console.error('WishlistService: Error fetching wishlist', error);
          this.isLoading = false;
          if (error.status === 401) {
            this.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.toastrService.error('Failed to fetch wishlist');
          }
          return throwError(() => error);
        })
      );
  }

  add_wishlist_product(token: string, product: IProduct): Observable<any> {
    const body = {
      productId: product.productId
    };
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, body, { headers: this.getHeaders(token) })
      .pipe(
        tap(response => {
          if (response.success) {
            this.wishlistCache = null; // Invalidate cache to force refresh on next get
            this.toastrService.success(response.message || `${product.productName} added to wishlist`);
          }
        }),
        catchError(error => {
          console.error('WishlistService: Error adding to wishlist', error);
          if (error.status === 401) {
            this.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.toastrService.error(`Failed to add ${product.productName} to wishlist`);
          }
          return throwError(() => error);
        })
      );
  }

  remove_wishlist_product(token: string, wishlistId: string): Observable<any> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${wishlistId}`, { headers: this.getHeaders(token) })
      .pipe(
        tap(response => {
          if (response.success) {
            this.wishlistCache = null; // Invalidate cache to force refresh
            this.toastrService.success(response.message || 'Item removed from wishlist');
          }
        }),
        catchError(error => {
          console.error('WishlistService: Error removing from wishlist', error);
          if (error.status === 401) {
            this.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.toastrService.error('Failed to remove item from wishlist');
          }
          return throwError(() => error);
        })
      );
  }
}
