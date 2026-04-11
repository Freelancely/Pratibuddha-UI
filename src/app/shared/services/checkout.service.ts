import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

// Interface for creating new billing info (no billingInfoId)
interface BillingInfoCreate {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  address: string;
  landMark: string;
  label: string;
}

// Interface for existing billing info (includes billingInfoId)
interface BillingInfo extends BillingInfoCreate {
  billingInfoId: string;
}

// Interface for order item
interface OrderItem {
  productId: string;
  quantity: number;
}

// Interface for place order request
interface PlaceOrderRequest {
  orderedItems: OrderItem[];
  couponCode: string | null;
  paymentMode: string;
  billingInfoId: string;
}

// Interface for API responses
interface BillingInfoResponse {
  success: boolean;
  message: BillingInfo;
}

interface BillingInfoListResponse {
  success: boolean;
  message: BillingInfo[];
}

interface BillingInfoActionResponse {
  success: boolean;
  message: string;
}

interface PlaceOrderResponse {
  success: boolean;
  message: string;
}

interface CouponVerifyResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:5177/api/billingInfo';
  private orderApiUrl = 'http://localhost:5177/api/order/place-order';
  private couponApiUrl = 'http://localhost:5177/api/coupon/verify';

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastrService.warning('Please log in to perform this action');
    }
    return new HttpHeaders({
      'accept': '*/*',
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getBillingInfos(): Observable<BillingInfoListResponse> {
    return this.http.get<BillingInfoListResponse>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          this.toastrService.error('Failed to load billing addresses');
          return throwError(() => error);
        })
      );
  }

  addBillingInfo(billingData: BillingInfoCreate): Observable<BillingInfoActionResponse> {
    return this.http.post<BillingInfoActionResponse>(this.apiUrl, billingData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  updateBillingInfo(billingInfoId: string, billingData: BillingInfoCreate): Observable<BillingInfoActionResponse> {
    return this.http.put<BillingInfoActionResponse>(`${this.apiUrl}?BillingInfoId=${billingInfoId}`, billingData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  deleteBillingInfo(billingInfoId: string): Observable<BillingInfoActionResponse> {
    return this.http.delete<BillingInfoActionResponse>(`${this.apiUrl}/${billingInfoId}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  placeOrder(orderData: PlaceOrderRequest): Observable<PlaceOrderResponse> {
    return this.http.post<PlaceOrderResponse>(this.orderApiUrl, orderData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  verifyCoupon(couponCode: string): Observable<CouponVerifyResponse> {
    return this.http.post<CouponVerifyResponse>(`${this.couponApiUrl}/${couponCode}`, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          this.toastrService.error('Failed to verify coupon');
          return throwError(() => error);
        })
      );
  }
}
