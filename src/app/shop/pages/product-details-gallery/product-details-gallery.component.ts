import { Component, OnInit } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
    selector: 'app-product-details-gallery',
    templateUrl: './product-details-gallery.component.html',
    styleUrls: ['./product-details-gallery.component.scss'],
    standalone: false
})
export class ProductDetailsGalleryComponent implements OnInit {
  public product!: IProduct;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    // Use getProducts with a default requestBody
    this.productService.getProducts({ pageNumber: 1, pageSize: 10 }).subscribe((response: any) => {
      const products: IProduct[] = response.data;
      this.product = products[8] || products[0]; // Fallback to first product if index 8 is out of bounds
    });
  }
}
