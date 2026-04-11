import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { IProduct } from '@/types/product-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  cartProducts: IProduct[] = [];
  couponCode: string = '';
  shipCost: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItemsObservable()
      .subscribe(cartItems => {
        console.log('CartComponent: Cart items updated', cartItems);
        this.cartProducts = cartItems.map(item => item.product);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  handleCouponSubmit() {
    console.log('CartComponent: Coupon submitted', this.couponCode);
    if (this.couponCode) {
      this.couponCode = '';
      this.cdr.detectChanges();
    }
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
    this.cdr.detectChanges();
  }

  incrementQuantity(item: IProduct) {
    this.cartService.quantityIncrement(item).subscribe();
  }

  decrementQuantity(item: IProduct) {
    this.cartService.quantityDecrement(item).subscribe();
  }

  removeItem(item: IProduct) {
    this.cartService.removeCartProduct(item).subscribe();
  }

  clearCart() {
    this.cartService.clear_cart().subscribe();
  }
}
