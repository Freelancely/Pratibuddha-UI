import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@/shared/services/cart.service';
import { CheckoutService } from '@/shared/services/checkout.service';
import { ToastrService } from 'ngx-toastr';

// Interface for existing billing info (includes billingInfoId)
interface BillingInfo {
  billingInfoId: string;
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  address: string;
  landMark: string;
  label: string;
}

// Interface for creating new billing info (no billingInfoId)
interface BillingInfoCreate {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  address: string;
  landMark: string;
  label: string;
}

// Interface for order item
interface OrderItem {
  productId: string;
  quantity: number;
  productUnitPrice?: number;
  discountPercentage?: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  isOpenLogin = false;
  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string | null = null;
  appliedCoupon: { code: string; discountPercent: number } | null = null;
  payment_name: string = '';
  billingInfos: BillingInfo[] = [];
  selectedBillingId: string | null = null;
  editingBillingId: string | null = null;
  isLoading = false;

  public labelOptions = [
    { value: '', text: 'Select Label' },
    { value: 'Home', text: 'Home' },
    { value: 'Office', text: 'Office' }
  ];

  public countrySelectOptions = [
    { value: 'select-country', text: 'Select Country' },
    { value: 'berlin-germany', text: 'Berlin Germany' },
    { value: 'paris-france', text: 'Paris France' },
    { value: 'tokiyo-japan', text: 'Tokiyo Japan' },
    { value: 'new-york-us', text: 'New York US' }
  ];

  constructor(
    public cartService: CartService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  public checkoutForm!: FormGroup;
  public formSubmitted = false;

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      landMark: new FormControl(null),
      label: new FormControl(null, Validators.required),
      orderNote: new FormControl(null)
    });

    this.loadBillingInfos();
  }

  loadBillingInfos(): void {
    this.isLoading = true;
    this.checkoutService.getBillingInfos().subscribe({
      next: (response) => {
        console.log('Billing infos response:', response);
        if (response.success) {
          this.billingInfos = response.message || [];
        } else {
          this.toastrService.error('Failed to load billing addresses');
          this.billingInfos = [];
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading billing addresses:', error);
        this.toastrService.error('Failed to load billing addresses');
        this.billingInfos = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveBilling(): void {
    this.formSubmitted = true;

    const billingFields = ['fullName', 'phoneNumber', 'province', 'city', 'address', 'label'];
    const isBillingValid = billingFields.every(field => this.checkoutForm.get(field)?.valid);

    if (!isBillingValid) {
      if (this.checkoutForm.get('phoneNumber')?.hasError('pattern')) {
        this.toastrService.error('Phone number must be exactly 10 numeric digits');
      } else {
        this.toastrService.error('Please fill in all required billing fields');
      }
      return;
    }

    this.isLoading = true;
    const billingData: BillingInfoCreate = {
      fullName: this.checkoutForm.get('fullName')?.value,
      phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
      province: this.checkoutForm.get('province')?.value,
      city: this.checkoutForm.get('city')?.value,
      address: this.checkoutForm.get('address')?.value,
      landMark: this.checkoutForm.get('landMark')?.value || '',
      label: this.checkoutForm.get('label')?.value
    };

    const request = this.editingBillingId
      ? this.checkoutService.updateBillingInfo(this.editingBillingId, billingData)
      : this.checkoutService.addBillingInfo(billingData);

    request.subscribe({
      next: (response) => {
        console.log('Save billing response:', response);
        if (response?.success !== false) {
          this.toastrService.success(this.editingBillingId ? 'Billing address updated successfully' : 'Billing address saved successfully');
          this.loadBillingInfos();
          this.checkoutForm.reset({
            fullName: null,
            phoneNumber: null,
            province: null,
            city: null,
            address: null,
            landMark: null,
            label: '',
            orderNote: null
          });
          this.editingBillingId = null;
          this.formSubmitted = false;
        } else {
          this.toastrService.error(response.message || 'Failed to save billing address');
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error saving billing address:', error);
        if (error.status === 400 && error.error?.errors) {
          const validationErrors = Object.values(error.error.errors).flat() as string[];
          validationErrors.forEach(err => this.toastrService.error(err));
        } else {
          this.toastrService.error('Error saving billing address: ' + (error.message || 'Unknown error'));
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editBilling(billing: BillingInfo): void {
    this.editingBillingId = billing.billingInfoId;
    this.checkoutForm.patchValue({
      fullName: billing.fullName,
      phoneNumber: billing.phoneNumber,
      province: billing.province,
      city: billing.city,
      address: billing.address,
      landMark: billing.landMark,
      label: billing.label
    });
    this.cdr.detectChanges();
  }

  deleteBilling(billingInfoId: string): void {
    if (confirm('Are you sure you want to delete this billing address?')) {
      this.isLoading = true;
      this.checkoutService.deleteBillingInfo(billingInfoId).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            this.loadBillingInfos();
            if (this.selectedBillingId === billingInfoId) {
              this.selectedBillingId = null;
            }
          } else {
            this.toastrService.error('Failed to delete billing address');
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error deleting billing address:', error);
          if (error.status === 400 && error.error?.errors) {
            const validationErrors = Object.values(error.error.errors).flat() as string[];
            validationErrors.forEach(err => this.toastrService.error(err));
          } else {
            this.toastrService.error('Error deleting billing address');
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  selectBilling(billingInfoId: string): void {
    this.selectedBillingId = billingInfoId;
    this.cdr.detectChanges();
  }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
    this.cdr.detectChanges();
  }

  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
    this.cdr.detectChanges();
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
    this.cdr.detectChanges();
  }

  changeHandler(selectedOption: { value: string; text: string }) {
    this.checkoutForm.patchValue({
      state: selectedOption.value
    });
    this.cdr.detectChanges();
  }

  changeLabelHandler(selectedOption: { value: string; text: string }) {
    this.checkoutForm.patchValue({
      label: selectedOption.value
    });
    this.checkoutForm.get('label')?.markAsTouched();
    this.checkoutForm.get('label')?.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  handleCouponSubmit() {
    if (!this.couponCode) {
      this.toastrService.error('Please enter a coupon code');
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.checkoutService.verifyCoupon(this.couponCode).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastrService.success(response.message);
          // Fetch coupon details to get discount percentage
          this.appliedCoupon = { code: this.couponCode!, discountPercent: 0 }; // Placeholder, update with actual discount
          this.cdr.detectChanges();
        } else {
          this.toastrService.error(response.message || 'Invalid coupon code');
          this.appliedCoupon = null;
          this.couponCode = null;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error verifying coupon:', error);
        this.toastrService.error('Error verifying coupon: ' + (error.message || 'Unknown error'));
        this.appliedCoupon = null;
        this.couponCode = null;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  handlePayment(value: string) {
    this.payment_name = value;
    this.cdr.detectChanges();
  }

  calculateTotal(): number {
    const subtotal = this.cartService.totalPriceQuantity()?.total || 0;
    let total = subtotal + this.shipCost;
    if (this.appliedCoupon && this.appliedCoupon.discountPercent > 0) {
      total -= (total * this.appliedCoupon.discountPercent) / 100;
    }
    return total;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.selectedBillingId) {
      this.toastrService.error('Please select a billing address');
      return;
    }
    if (!this.payment_name) {
      this.toastrService.error('Please select a payment method');
      return;
    }

    const orderedItems: OrderItem[] = this.cartService.getCartProducts().map(item => ({
      productId: item.productId,
      quantity: item.orderQuantity || 1
    }));

    const orderData = {
      orderedItems,
      couponCode: this.appliedCoupon ? this.appliedCoupon.code : null,
      paymentMode: this.payment_name,
      billingInfoId: this.selectedBillingId
    };

    this.isLoading = true;
    this.checkoutService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Place order response:', response);
        if (response.success) {
          this.toastrService.success(response.message);
          this.cartService.clear_cart().subscribe({
            next: () => {
              console.log('Cart cleared successfully');
              this.checkoutForm.reset({
                fullName: null,
                phoneNumber: null,
                province: null,
                city: null,
                address: null,
                landMark: null,
                label: '',
                orderNote: null
              });
              this.formSubmitted = false;
              this.selectedBillingId = null;
              this.couponCode = null;
              this.appliedCoupon = null;
              this.payment_name = '';
              this.isLoading = false;
              this.cdr.detectChanges();
            },
            error: (error) => {
              console.error('Error clearing cart:', error);
              this.toastrService.error('Order placed, but failed to clear cart');
              this.isLoading = false;
              this.cdr.detectChanges();
            }
          });
        } else {
          this.toastrService.error(response.message || 'Failed to place order');
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error placing order:', error);
        if (error.status === 400 && error.error?.errors) {
          const validationErrors = Object.values(error.error.errors).flat() as string[];
          validationErrors.forEach(err => this.toastrService.error(err));
        } else {
          this.toastrService.error('Error placing order: ' + (error.message || 'Unknown error'));
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get fullName() { return this.checkoutForm.get('fullName'); }
  get phoneNumber() { return this.checkoutForm.get('phoneNumber'); }
  get province() { return this.checkoutForm.get('province'); }
  get city() { return this.checkoutForm.get('city'); }
  get address() { return this.checkoutForm.get('address'); }
  get landMark() { return this.checkoutForm.get('landMark'); }
  get label() { return this.checkoutForm.get('label'); }
  get orderNote() { return this.checkoutForm.get('orderNote'); }
}
