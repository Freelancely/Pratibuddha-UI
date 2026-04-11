import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

@Component({
    selector: 'app-related-products',
    templateUrl: './related-products.component.html',
    styleUrls: ['./related-products.component.scss'],
    standalone: false
})
export class RelatedProductsComponent implements OnInit {
  @Input() productId!: string;
  @Input() category!: string;
  public related_products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  private loadRelatedProducts() {
    if (this.productId && this.category) {
      this.productService.filterProducts({
        categoryName: this.category,
        pageSize: 8
      }).subscribe((response: any) => {
        this.related_products = response.data
          .filter((p: IProduct) => p.productId !== this.productId)
          .sort((a: IProduct, b: IProduct) => (b.sales || 0) - (a.sales || 0))
          .slice(0, 4);
      });
    }
  }

  ngOnInit(): void {
    this.loadRelatedProducts();
    new Swiper('.tp-product-related-slider-active', {
      slidesPerView: 4,
      spaceBetween: 24,
      modules: [Scrollbar],
      scrollbar: {
        el: ".tp-related-swiper-scrollbar",
        draggable: true,
        dragClass: "tp-swiper-scrollbar-drag",
        snapOnRelease: true
      },
      breakpoints: {
        "1200": { slidesPerView: 4 },
        "992": { slidesPerView: 3 },
        "768": { slidesPerView: 2 },
        "576": { slidesPerView: 2 },
        "0": { slidesPerView: 1 }
      }
    });
  }
}
