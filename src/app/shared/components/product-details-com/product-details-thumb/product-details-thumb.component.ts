import { UtilsService } from '@/shared/services/utils.service';
import { Component, Input, OnInit } from '@angular/core'; // Added OnInit
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
    selector: 'app-product-details-thumb',
    templateUrl: './product-details-thumb.component.html',
    styleUrls: ['./product-details-thumb.component.scss'],
    standalone: false
})
export class ProductDetailsThumbComponent implements OnInit { // Changed to implement OnInit
  @Input() product!: IProduct;

  constructor(
    public productService: ProductService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    if (this.product && this.product.img) { // Check for product.img
      this.productService.activeImg = this.product.img;
    }
  }
}
