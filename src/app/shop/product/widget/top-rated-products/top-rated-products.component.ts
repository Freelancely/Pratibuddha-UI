import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct, IReview } from '@/types/product-type';

@Component({
    selector: 'app-top-rated-products',
    templateUrl: './top-rated-products.component.html',
    styleUrls: ['./top-rated-products.component.scss'],
    standalone: false
})
export class TopRatedProductsComponent implements OnInit {
  public topRatedProducts: { product: IProduct; rating: number }[] = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.loadTopRatedProducts();
  }

  private loadTopRatedProducts() {
    this.productService.filterProducts().subscribe((response: any) => {
      this.topRatedProducts = response.data
        .map((product: IProduct) => {
          if (product.reviews && product.reviews.length > 0) {
            const totalRating = product.reviews.reduce(
              (sum: number, review: IReview) => sum + review.rating,
              0
            );
            const averageRating = totalRating / product.reviews.length;

            return {
              product,
              rating: parseFloat(averageRating.toFixed(1)),
            };
          }
          // Fallback to avgRating if no reviews
          return {
            product,
            rating: product.avgRating || 0,
          };
        })
        .filter(
          (item: { product: IProduct; rating: number } | undefined): item is { product: IProduct; rating: number } =>
            item !== undefined
        )
        .sort((a: { product: IProduct; rating: number }, b: { product: IProduct; rating: number }) => b.rating - a.rating)
        .slice(0, 4); // Top 4 rated products
    });
  }
}
