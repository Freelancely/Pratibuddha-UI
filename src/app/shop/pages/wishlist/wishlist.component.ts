import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '@/types/product-type';
import { WishlistService } from '@/shared/services/wishlist.service';
import { CartService } from '@/shared/services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

interface WishlistItem {
  wishlistId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  productPrice: number;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone: false
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems: WishlistItem[] = [];
  cartItems: IProduct[] = [];
  private token: string | null = null;
  private tokenSubscription: Subscription | null = null;
  private cartSubscription: Subscription | null = null;

  constructor(
    public wishlistService: WishlistService,
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.token = localStorage.getItem('token');
    // console.log('WishlistComponent initial token:', this.token);
    // if (this.token) {
    //   this.loadWishlist();
    // } else {
    //   console.warn('No token in localStorage on init');
    //   this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    // }

    // this.tokenSubscription = this.authService.token$.subscribe(token => {
    //   this.token = token;
    //   console.log('WishlistComponent token$:', token);
    //   if (this.token) {
    //     this.loadWishlist();
    //     if (this.tokenSubscription) {
    //       this.tokenSubscription.unsubscribe();
    //     }
    //   }
    // });

    // this.cartSubscription = this.cartService.getCartItemsObservable().subscribe(items => {
    //   this.cartItems = items.map(item => item.product);
    //   console.log('WishlistComponent: Cart items updated', this.cartItems);
    //   this.cdr.detectChanges();
    // });
  }

  ngOnDestroy() {
    // if (this.tokenSubscription) {
    //   this.tokenSubscription.unsubscribe();
    // }
    // if (this.cartSubscription) {
    //   this.cartSubscription.unsubscribe();
    // }
  }

  private loadWishlist() {
    if (this.token) {
      this.wishlistService.getWishlistProducts(this.token).subscribe({
        next: (items) => {
          this.wishlistItems = items;
          console.log('WishlistComponent: Wishlist items loaded', items);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Wishlist load error:', err);
          if (err.status === 401) {
            this.wishlistService.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.wishlistService.toastrService.error('Failed to load wishlist');
          }
        }
      });
    }
  }

  addToCart(item: WishlistItem) {
    console.log('WishlistComponent: Adding to cart', { productId: item.productId, productName: item.productName });
    const product: IProduct = {
      productId: item.productId,
      productName: item.productName,
      productDescription: '',
      productImageUrl: [{ img: item.imageUrl }],
      productUnitPrice: item.productPrice,
      price: item.productPrice,
      status: 'in-stock',
      quantity: 1,
      orderQuantity: 1,
      discount: 0
    };
    if (product.status === 'out-of-stock' || (product.quantity ?? 0) === 0) {
      this.cartService.toastrService.error(`Out of stock ${product.productName}`);
      return;
    }
    this.cartService.addCartProduct(product).subscribe({
      next: response => {
        console.log('WishlistComponent: Add to cart response', response);
      },
      error: error => {
        console.error('WishlistComponent: Add to cart error', error);
      }
    });
  }

  removeFromWishlist(wishlistId: string) {
    if (this.token) {
      const item = this.wishlistItems.find(i => i.wishlistId === wishlistId);
      const productName = item ? item.productName : 'item';
      this.wishlistService.remove_wishlist_product(this.token, wishlistId).subscribe({
        next: () => {
          this.loadWishlist();
          this.wishlistService.toastrService.success(`${productName} removed from wishlist`);
        },
        error: (err) => {
          console.error('Remove from wishlist error:', err);
          if (err.status === 401) {
            this.wishlistService.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.wishlistService.toastrService.error(`Failed to remove ${productName} from wishlist`);
          }
        }
      });
    }
  }
}
