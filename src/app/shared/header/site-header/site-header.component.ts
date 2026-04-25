import { Component, HostListener, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '@/shared/services/cart.service';
import { UtilsService } from '@/shared/services/utils.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  standalone: false,
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
  sticky = false;
  searchText = '';
  cartItemCount = 0;

  private cartSubscription?: Subscription;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItemsObservable().subscribe((cartItems) => {
      this.cartItemCount = cartItems.reduce((total, item) => total + (item.product.orderQuantity ?? 0), 0);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  @HostListener('window:scroll')
  onscroll(): void {
    this.sticky = window.scrollY > 80;
  }

  handleSearchSubmit(): void {
    if (!this.searchText) return;
    this.router.navigate(['/pages/search'], { queryParams: { searchText: this.searchText } });
  }
}

