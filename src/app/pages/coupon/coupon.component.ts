import { Component, OnInit } from '@angular/core';
import { CouponService, Coupon } from '../Admin/services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  standalone: false
})
export class CouponComponent implements OnInit {
  public coupons: Coupon[] = [];
  index: number | null = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.couponService.getValidCoupons().subscribe({
      next: (response) => {
        if (response.success) {
          this.coupons = response.message;
        }
      },
      error: (error) => {
        console.error('Failed to fetch coupons:', error);
      }
    });
  }

  isCouponActive(coupon: Coupon): boolean {
    const currentTime = new Date().getTime();
    const couponEndTime = new Date(coupon.endDate).getTime();
    return currentTime > couponEndTime;
  }

  async copyCouponCode(couponCode: string, i: number) {
    try {
      await navigator.clipboard.writeText(couponCode);
      this.index = i;
      setTimeout(() => {
        this.index = null;
      }, 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
}
