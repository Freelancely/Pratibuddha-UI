import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, debounceTime } from 'rxjs/operators';
import { IProduct } from '@/types/product-type';

interface CartItemResponse {
  success?: boolean;
  succss?: boolean; // Handle typo in API response
  message: {
    cartItemId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number;
    imageUrl: string;
  }[];
}

interface CartItem {
  product: IProduct;
  cartItemId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public isCartOpen: boolean = false;
  private apiUrl = 'http://localhost:5177/api/cart';
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    public toastrService: ToastrService
  ) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'Customer') {
      this.loadCartItems();
    }
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastrService.warning('Please log in to view your cart');
    }
    return new HttpHeaders({
      'accept': '*/*',
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  private loadCartItems(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.http.get<CartItemResponse>(`${this.apiUrl}/cart-items`, { headers: this.getHeaders() })
      .pipe(
        tap(() => (this.isLoading = false)),
        debounceTime(100), // Prevent rapid successive calls
        catchError(error => {
          this.isLoading = false;
          console.error('Error fetching cart items:', error);
          this.toastrService.error('Failed to load cart items');
          this.cartItems = [];
          this.cartItemsSubject.next(this.cartItems);
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        console.log('CartService: API response', response);
        // Handle both 'success' and 'succss' due to API typo
        if ((response.success || response.succss) && Array.isArray(response.message)) {
          this.cartItems = response.message.map(item => ({
            cartItemId: item.cartItemId,
            product: {
              productId: item.productId,
              productName: item.productName,
              productDescription: '',
              price: item.price,
              orderQuantity: item.quantity,
              productImageUrl: item.imageUrl ? [{ img: item.imageUrl }] : [],
              status: 'in-stock',
              quantity: item.quantity,
              discount: item.price !== item.priceAfterDiscount
                ? ((item.price - item.priceAfterDiscount) / item.price * 100)
                : 0,
              discountedPrice: item.priceAfterDiscount
            }
          }));
          this.cartItemsSubject.next(this.cartItems);
          console.log('CartService: Updated cart items', this.cartItems);
        } else {
          console.warn('CartService: Invalid API response', response);
          this.cartItems = [];
          this.cartItemsSubject.next(this.cartItems);
        }
      });
  }

  public getCartProducts(): IProduct[] {
    return this.cartItems.map(item => item.product);
  }

  public getCartItemsObservable(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  handleOpenCartSidebar() {
    this.isCartOpen = !this.isCartOpen;
  }

  addCartProduct(payload: IProduct): Observable<any> {
    const body = {
      productId: payload.productId,
      quantity: payload.orderQuantity || 1
    };

    return this.http.post(`${this.apiUrl}/add-to-cart`, body, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('CartService: Add to cart response', response);
          this.toastrService.success(`${payload.productName} added to cart`);
          this.loadCartItems();
        }),
        catchError(error => {
          console.error('CartService: Error adding to cart', error);
          this.toastrService.error(`Failed to add ${payload.productName} to cart`);
          return throwError(() => error);
        })
      );
  }

  quantityIncrement(product: IProduct): Observable<any> {
    const cartItem = this.cartItems.find(item => item.product.productId === product.productId);
    if (!cartItem?.cartItemId) {
      return throwError(() => new Error('Cart item not found'));
    }

    const body = {
      cartItemId: cartItem.cartItemId,
      quantity: 1
    };

    return this.http.post(`${this.apiUrl}/increase-quantity`, body, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('CartService: Quantity increment response', response);
          this.toastrService.success('Quantity increased');
          this.loadCartItems();
        }),
        catchError(error => {
          console.error('CartService: Error increasing quantity', error);
          this.toastrService.error('Failed to increase quantity');
          return throwError(() => error);
        })
      );
  }

  quantityDecrement(product: IProduct): Observable<any> {
    const cartItem = this.cartItems.find(item => item.product.productId === product.productId);
    if (!cartItem?.cartItemId) {
      return throwError(() => new Error('Cart item not found'));
    }

    const body = {
      cartItemId: cartItem.cartItemId,
      quantity: 1
    };

    return this.http.post(`${this.apiUrl}/decrease-quantity`, body, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('CartService: Quantity decrement response', response);
          this.toastrService.info(`Decremented quantity for ${product.productName}`);
          this.loadCartItems();
        }),
        catchError(error => {
          console.error('CartService: Error decreasing quantity', error);
          this.toastrService.error('Failed to decrease quantity');
          return throwError(() => error);
        })
      );
  }

  removeCartProduct(product: IProduct): Observable<any> {
    const cartItem = this.cartItems.find(item => item.product.productId === product.productId);
    if (!cartItem?.cartItemId) {
      return throwError(() => new Error('Cart item not found'));
    }

    const body = {
      cartItemId: cartItem.cartItemId
    };

    return this.http.delete(`${this.apiUrl}/remove-item`, { headers: this.getHeaders(), body })
      .pipe(
        tap(response => {
          console.log('CartService: Remove item response', response);
          this.toastrService.error(`${product.productName} removed from cart`);
          this.loadCartItems();
        }),
        catchError(error => {
          console.error('CartService: Error removing item', error);
          this.toastrService.error('Failed to remove item from cart');
          return throwError(() => error);
        })
      );
  }

  clear_cart(): Observable<any> {
    const confirmMsg = window.confirm('Are you sure you want to clear all cart items?');
    if (!confirmMsg) {
      return throwError(() => new Error('Clear cart cancelled'));
    }

    return this.http.delete(`${this.apiUrl}/remove-all`, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('CartService: Clear cart response', response);
          this.cartItems = [];
          this.cartItemsSubject.next(this.cartItems);
          this.toastrService.success('Cart cleared successfully');
        }),
        catchError(error => {
          console.error('CartService: Error clearing cart', error);
          this.toastrService.error('Failed to clear cart');
          return throwError(() => error);
        })
      );
  }

  totalPriceQuantity() {
    return this.cartItems.reduce(
      (cartTotal: { total: number; quantity: number }, cartItem: CartItem) => {
        const { discountedPrice, orderQuantity } = cartItem.product;
        if (typeof orderQuantity !== 'undefined') {
          const itemTotal = (discountedPrice ?? cartItem.product.price ?? 0) * orderQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += orderQuantity;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0
      }
    );
  }

  initialOrderQuantity() {
    return 1;
  }
}
