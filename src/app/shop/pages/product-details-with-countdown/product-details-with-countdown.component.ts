import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-product-details-with-countdown',
    templateUrl: './product-details-with-countdown.component.html',
    styleUrls: ['./product-details-with-countdown.component.scss'],
    standalone: false
})
export class ProductDetailsWithCountdownComponent implements OnInit {
  public product!: IProduct;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    // Use getProducts with a default requestBody
    this.productService.getProducts({ pageNumber: 1, pageSize: 1 }).subscribe((response: any) => {
      const products: IProduct[] = response.data;
      this.product = products.find((p: IProduct) => p.offerDate?.endDate) || products[0]; // Fallback to first product if no offerDate
    });
  }
}
