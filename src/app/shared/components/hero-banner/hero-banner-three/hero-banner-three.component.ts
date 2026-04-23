import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

@Component({
    selector: 'app-hero-banner-three',
    templateUrl: './hero-banner-three.component.html',
    styleUrls: ['./hero-banner-three.component.scss'],
    standalone: false
})
export class HeroBannerThreeComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  // slider data
  public slider_data = [
    {
      id: 1,
      bg: "image-set(url('/assets/img/electronics/hero/hero-tv-1280.webp') 1x, url('/assets/img/electronics/hero/hero-tv-1920.webp') 2x)",
      subtitle: "Entertainment Essentials",
      title: "Upgrade your home cinema with 4K TVs",
    },
    {
      id: 2,
      bg: "image-set(url('/assets/img/electronics/hero/hero-fridge-1280.webp') 1x, url('/assets/img/electronics/hero/hero-fridge-1920.webp') 2x)",
      subtitle: "Smart Kitchen",
      title: "Fresh food, smarter storage, lower energy",
    },
    {
      id: 3,
      bg: "image-set(url('/assets/img/electronics/hero/hero-washer-1280.webp') 1x, url('/assets/img/electronics/hero/hero-washer-1920.webp') 2x)",
      subtitle: "Laundry Made Easy",
      title: "Quiet, efficient washing for every home",
    },
  ]

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance =  new Swiper('.tp-slider-active-3', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: 'fade',
        modules: [Pagination, EffectFade],
        pagination: {
          el: ".tp-slider-3-dot",
          clickable: true
        }
      });
    }
  }
}
