import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UserProfile {
  userId: string;
  profileImageUrl: string | null;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  isBanned: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  userId: string;
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  orderDateTime: string;
  amountBeforeDiscount: number;
  appliedCouponCode: string;
  couponDiscountPercent: number;
  amountAfterDiscount: number;
  status: string;
  paymentMethod: string;
  billingInfoId: string;
  remarks: string | null;
  orderItems: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  message: Order[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    previousPage: number | null;
    nextPage: number | null;
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

export interface CancelOrderResponse {
  success: boolean;
  message: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getUserProfile(token: string): Observable<UserProfile> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`, { headers });
  }

  updateUserProfile(token: string, formData: FormData): Observable<UpdateProfileResponse> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<UpdateProfileResponse>(`${this.apiUrl}/user`, formData, { headers });
  }

  viewOrders(token: string, userId: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      pageNumber: 1,
      pageSize: 10,
      status: null,
      paymentMethod: null,
      userId: userId,
      productId: null,
      fromDate: null,
      toDate: null
    };

    return this.http.post<OrderResponse>(`${this.apiUrl}/order/view-orders`, body, { headers });
  }

  cancelOrder(token: string, orderId: string): Observable<CancelOrderResponse> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      orderId,
      status: 'Cancelled'
    };

    return this.http.put<CancelOrderResponse>(`${this.apiUrl}/order/customer/change-status`, body, { headers });
  }

  changePassword(token: string, payload: { oldPassword: string; newPassword: string; confirmPassword: string }): Observable<ChangePasswordResponse> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<ChangePasswordResponse>(`${this.apiUrl}/user/change-password`, payload, { headers });
  }
}
