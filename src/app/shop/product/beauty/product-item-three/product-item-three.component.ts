import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '@/shared/services/cart.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { IProduct } from '@/types/product-type';
import { CompareService } from '@/shared/services/compare.service';
import { UtilsService } from '@/shared/services/utils.service';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

interface WishlistItem {
  wishlistId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  productPrice: number;
}

@Component({
  selector: 'app-product-item-three',
  templateUrl: './product-item-three.component.html',
  styleUrls: ['./product-item-three.component.scss'],
  standalone: false
})
export class ProductItemThreeComponent implements OnInit, OnDestroy {
  @Input() product!: IProduct;
  @Input() style_2: boolean = false;
  @Input() isCenter: boolean = false;
  @Input() primary_style: boolean = false;
  public wishlistItems: WishlistItem[] = [];
  private token: string | null = null;
  private tokenSubscription: Subscription | null = null;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public compareService: CompareService,
    public utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    console.log('ProductItemThreeComponent initial token:', this.token); // Debug
    if (this.token) {
      this.loadWishlist();
    } else {
      console.warn('No token in localStorage on init');
    }

    this.tokenSubscription = this.authService.token$.subscribe(token => {
      this.token = token;
      console.log('ProductItemThreeComponent token$:', token); // Debug
      if (this.token) {
        this.loadWishlist();
        if (this.tokenSubscription) {
          this.tokenSubscription.unsubscribe();
          this.tokenSubscription = null;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  private loadWishlist() {
    if (this.token) {
      this.wishlistService.getWishlistProducts(this.token).subscribe({
        next: (items) => {
          this.wishlistItems = items;
        },
        error: (err) => {
          console.error('Wishlist load error:', err);
          if (err.status === 401) {
            this.utilsService.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.utilsService.toastrService.error('Failed to load wishlist');
          }
        }
      });
    }
  }

  addToCart(product: IProduct) {
    if (product.productStatus === 'out-of-stock' || (product.quantity ?? 0) === 0) {
      this.cartService.toastrService.error(`Out of stock ${product.productName}`);
      return;
    }
    this.cartService.addCartProduct(product).subscribe();
  }

  addToWishlist(product: IProduct) {
    if (this.token) {
      this.wishlistService.add_wishlist_product(this.token, product).subscribe({
        next: () => {
          this.loadWishlist();
        },
        error: (err) => {
          console.error('Add to wishlist error:', err);
          if (err.status === 401) {
            this.utilsService.toastrService.warning('Session expired. Please log in again.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else {
            this.utilsService.toastrService.error(`Failed to add ${product.productName} to wishlist`);
          }
        }
      });
    } else {
      console.error('No token provided for wishlist API calls');
      this.utilsService.toastrService.warning('Please log in to add items to your wishlist');
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  addToCompare(product: IProduct) {
    this.compareService.add_compare_product(product);
  }

  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd: IProduct) => prd.productId === item.productId);
  }

  isItemInWishlist(item: IProduct): boolean {
    return this.wishlistItems.some((prd: WishlistItem) => prd.productId === item.productId);
  }

  isItemInCompare(item: IProduct): boolean {
    return this.compareService.getCompareProducts().some((prd: IProduct) => prd.productId === item.productId);
  }

  productStatus(product: IProduct): boolean {
    return product.productStatus === 'out-of-stock' || (product.quantity !== undefined && product.quantity === 0);
  }
}
