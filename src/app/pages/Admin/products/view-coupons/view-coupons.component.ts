import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { CouponService, Coupon } from '../../services/coupon.service';

@Component({
  selector: 'app-view-coupons',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-coupons.component.html',
  styleUrls: ['./view-coupons.component.scss']
})
export class ViewCouponsComponent implements OnInit {
  activeTab = signal<'live' | 'expired'>('live');
  coupons = signal<Coupon[]>([]);
  errorMessage = signal<string | null>(null);

  constructor(
    private couponService: CouponService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.loadCoupons();
  }

  setActiveTab(tab: 'live' | 'expired') {
    this.activeTab.set(tab);
    this.loadCoupons();
  }

  loadCoupons() {
    const apiCall = this.activeTab() === 'live'
      ? this.couponService.getValidCoupons()
      : this.couponService.getAllCoupons();

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          const now = new Date();
          const filteredCoupons = this.activeTab() === 'expired'
            ? response.message.filter(coupon => new Date(coupon.endDate) < now)
            : response.message;
          this.coupons.set(filteredCoupons);
        } else {
          this.errorMessage.set('Failed to load coupons');
        }
      },
      error: (error) => {
        this.errorMessage.set('Error loading coupons: ' + error.message);
        console.error('Error fetching coupons:', error.message);
      }
    });
  }

  editCoupon(coupon: Coupon) {
    this.router.navigate(['/pages/admin/add-coupon'], { state: { coupon: { ...coupon, id: coupon.couponId } } });
  }

  goBack() {
    this.location.back();
  }
}
