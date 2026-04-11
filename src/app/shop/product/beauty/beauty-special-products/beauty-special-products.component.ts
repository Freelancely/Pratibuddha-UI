import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-beauty-special-products',
    templateUrl: './beauty-special-products.component.html',
    styleUrls: ['./beauty-special-products.component.scss'],
    standalone: false
})
export class BeautySpecialProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  public products: IProduct[] = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts({ pageNumber: 1, pageSize: 12 }).subscribe((response: any) => {
      this.products = response.data.filter((p: IProduct) => p.productType === "beauty").slice(-4);
    });
  }

  ngAfterViewInit() {
    if (this.swiperContainer && this.swiperContainer.nativeElement) {
      this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        modules: [Navigation, Pagination, EffectFade],
        pagination: {
          el: ".tp-special-slider-dot",
          clickable: true
        },
        navigation: {
          nextEl: '.tp-special-slider-button-next',
          prevEl: '.tp-special-slider-button-prev'
        }
      });
    }
  }
}
