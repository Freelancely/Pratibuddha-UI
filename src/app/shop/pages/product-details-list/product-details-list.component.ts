import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-product-details-list',
    templateUrl: './product-details-list.component.html',
    styleUrls: ['./product-details-list.component.scss'],
    standalone: false
})
export class ProductDetailsListComponent implements OnInit {
  public product!: IProduct;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    // Use getProducts with a default requestBody
    this.productService.getProducts({ pageNumber: 1, pageSize: 10 }).subscribe((response: any) => {
      const products: IProduct[] = response.data;
      this.product = products[5] || products[0]; // Fallback to first product if index 5 is out of bounds
    });
  }
}
