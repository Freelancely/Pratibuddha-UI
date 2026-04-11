import { Component, HostListener, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { UtilsService } from '@/shared/services/utils.service';
import { Subscription } from 'rxjs';

interface WishlistItem {
  wishlistId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  productPrice: number;
}

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss'],
  standalone: false
})
export class HeaderThreeComponent implements OnInit, OnDestroy {
  sticky: boolean = false;
  cartItemCount: number = 0;
  wishlistItems: WishlistItem[] = [];
  private cartSubscription: Subscription | undefined;
  private wishlistSubscription: Subscription | undefined;
  private token: string = ''; // Replace with AuthService token retrieval

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
    private cdr: ChangeDetectorRef
  ) {
    // Replace with actual token retrieval, e.g., this.token = authService.getToken();
  }

  ngOnInit() {
    // Cart subscription
    this.cartSubscription = this.cartService.getCartItemsObservable()
      .subscribe(cartItems => {
        this.cartItemCount = cartItems.reduce((total, item) => total + (item.product.orderQuantity ?? 0), 0);
        this.cdr.detectChanges();
      });

    // Wishlist subscription
    if (this.token) {
      this.wishlistSubscription = this.wishlistService.getWishlistProducts(this.token)
        .subscribe({
          next: (items) => {
            this.wishlistItems = items;
            this.cdr.detectChanges();
          },
          error: () => {
            this.wishlistItems = [];
            this.cdr.detectChanges();
          }
        });
    } else {
      console.error('No token provided for wishlist API calls');
    }
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
