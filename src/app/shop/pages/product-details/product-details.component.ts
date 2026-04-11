import { Component } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    standalone: false
})
export class ProductDetailsComponent {
  public product!: IProduct;

  constructor(public productService: ProductService) {
    // Use filterProducts with default parameters
    this.productService.filterProducts().subscribe((response: any) => {
      if (response.data && response.data.length > 0) {
        this.product = response.data[0]; // Assign the first product
      }
    });
  }
}
