import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { IProduct } from '@/types/product-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
  standalone: false
})
export class CartSidebarComponent implements OnInit, OnDestroy {
  cartProducts: IProduct[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItemsObservable()
      .subscribe(cartItems => {
        console.log('CartSidebar: Cart items updated', cartItems);
        this.cartProducts = cartItems.map(item => item.product);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeItem(item: IProduct) {
    this.cartService.removeCartProduct(item).subscribe();
  }
}
