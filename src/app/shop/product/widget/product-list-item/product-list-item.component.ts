import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '@/types/product-type';
import { CartService } from '@/shared/services/cart.service';
import { CompareService } from '@/shared/services/compare.service';
import { UtilsService } from '@/shared/services/utils.service';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';


@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  standalone: false
})
export class ProductListItemComponent implements OnInit, OnDestroy {
  @Input() product!: IProduct;
  private token: string | null = null;
  private tokenSubscription: Subscription | null = null;

  constructor(
    public cartService: CartService,
    public compareService: CompareService,
    public utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    console.log('ProductListItemComponent initial token:', this.token); // Debug

    this.tokenSubscription = this.authService.token$.subscribe(token => {
      this.token = token;
      console.log('ProductListItemComponent token$:', token); // Debug
    });
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }


  addToCart(product: IProduct) {
    if (product.productStatus === 'out-of-stock' || (product.quantity ?? 0) === 0) {
      this.cartService.toastrService.error(`Out of stock ${product.productName}`);
      return;
    }
    this.cartService.addCartProduct(product).subscribe();
  }

  addToCompare(product: IProduct) {
    this.compareService.add_compare_product(product);
  }

  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd: IProduct) => prd.productId === item.productId);
  }

}
