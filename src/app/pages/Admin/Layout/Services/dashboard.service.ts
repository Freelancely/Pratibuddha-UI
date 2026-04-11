import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

interface StatsResponse {
  success: boolean;
  message: {
    totalIncome: number;
    totalOrders: number;
    completedOrders: number;
    totalCustomers: number;
    Polytron?: number;
    Genex?: number;
    Chunlan?: number;
    [key: string]: any;
  };
}

interface Order {
  orderId: string;
  fullName: string;
  orderDateTime: string;
  amountAfterDiscount: number;
  status: string;
}

interface RecentOrdersResponse {
  success: boolean;
  message: Order[];
}

interface Product {
  productId: string;
  productName: string;
  productImageUrl: string;
  totalQuantitySold: number;
  category: string;
  stock: number;
  price: number;
}

interface ProductsResponse {
  success: boolean;
  message: Product[];
}

interface MonthlySalesResponse {
  success: boolean;
  message: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = `${environment.apiUrl}/dashboard/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // ✅ NEW: For headers
  ) {}

  // ✅ FIXED: Add Authorization header
  private getHeaders() {
    return this.authService.getAuthHeaders();
  }

  getStats(): Observable<StatsResponse['message']> {
    return this.http.get<StatsResponse>(`${this.baseUrl}stats`, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (response.success) return response.message;
        throw new Error('Failed to fetch stats');
      }),
      catchError(error => {
        console.error('Error fetching stats:', error);
        return throwError(() => new Error('Error fetching dashboard stats'));
      })
    );
  }

  getRecentOrders(): Observable<Order[]> {
    return this.http.get<RecentOrdersResponse>(`${this.baseUrl}recentOrders`, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (response.success) return response.message;
        throw new Error('Failed to fetch recent orders');
      }),
      catchError(error => {
        console.error('Error fetching recent orders:', error);
        return throwError(() => new Error('Error fetching recent orders'));
      })
    );
  }

  getTopProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}products`, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (response.success) return response.message;
        throw new Error('Failed to fetch products');
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Error fetching top products'));
      })
    );
  }

  getMonthlySales(from: string, to: string): Observable<{ [key: string]: number }> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<MonthlySalesResponse>(`${this.baseUrl}monthlySales`, {
      params,
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        if (response.success) return response.message;
        throw new Error('Failed to fetch monthly sales');
      }),
      catchError(error => {
        console.error('Error fetching monthly sales:', error);
        return throwError(() => new Error('Error fetching monthly sales'));
      })
    );
  }
}
