import { Component, Input } from '@angular/core';
import { IProduct, IProductImage } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
  standalone: false
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;

  textMore = false;
  selectedQuantity: number = 1; // Local state for quantity selection

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  handleIsColorVariant(product: IProduct) {
    return product.productImageUrl.some((item: IProductImage) => item?.color && item?.color?.name);
  }

  handleImageSelect(item: IProductImage) {
    // Implement image selection logic here if needed (e.g., update active image)
    console.log('Selected image:', item.img);
  }

  incrementQuantity() {
    this.selectedQuantity++;
  }

  decrementQuantity() {
    this.selectedQuantity = this.selectedQuantity > 1 ? this.selectedQuantity - 1 : 1;
  }

  addToCart() {
    if (this.product.status === 'out-of-stock' || (this.product.quantity ?? 0) === 0) {
      this.cartService.toastrService.error(`Out of stock ${this.product.productName}`);
      return;
    }
    // Update product with selected quantity before adding to cart
    const productToAdd: IProduct = {
      ...this.product,
      orderQuantity: this.selectedQuantity
    };
    this.cartService.addCartProduct(productToAdd).subscribe({
      next: () => {
        this.selectedQuantity = 1; // Reset quantity after adding to cart
      }
    });
  }

  ngOnInit() {}
}
