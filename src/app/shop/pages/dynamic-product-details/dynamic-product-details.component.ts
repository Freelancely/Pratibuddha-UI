import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-dynamic-product-details',
    templateUrl: './dynamic-product-details.component.html',
    styleUrls: ['./dynamic-product-details.component.scss'],
    standalone: false
})
export class DynamicProductDetailsComponent implements OnInit {
  public product: IProduct | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          // Use getProducts and filter by productId
          return this.productService.getProducts({ productId }).pipe(
            switchMap(response => {
              const products: IProduct[] = response.data || [];
              const foundProduct = products.find(p => p.productId === productId);
              return of(foundProduct || null); // Emit null if no product is found
            })
          );
        }
        return of<IProduct | null>(null); // Emit null if there's no productId
      })
    ).subscribe((product: IProduct | null | undefined) => {
      if (!product) {
        // Product not found, navigate to 404 page
        this.router.navigate(['/404']);
      } else {
        this.product = product;
      }
    });
  }
}
