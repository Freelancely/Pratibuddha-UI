import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
    selector: 'app-beauty-testimonial',
    templateUrl: './beauty-testimonial.component.html',
    styleUrls: ['./beauty-testimonial.component.scss'],
    standalone: false
})
export class BeautyTestimonialComponent {
  // testimonial data
  public testi_data = [
    {
      id: 1,
      review: 4,
      desc: "Sleek design, powerful features, and easy to use. Great performance and perfect for daily use — truly a great appliance choice!",
      user: "/assets/img/users/user-1-512.webp",
      name: "John doe",
      designation: "Customer",
    },
    {
      id: 2,
      review: 3.5,
      desc: "Sleek design, powerful features, and easy to use. Great performance and perfect for daily use — truly a great appliance choice!",
      user: "/assets/img/users/user-2-512.webp",
      name: "John doe",
      designation: "Customer",
    },
    {
      id: 3,
      review: 5,
      desc: "Sleek design, powerful features, and easy to use. Great performance and perfect for daily use — truly a great appliance choice!",
      user: "/assets/img/users/user-3-512.webp",
      name: "John doe",
      designation: "Customer",
    },
  ]
  // swiper setting
  ngOnInit(): void {
    new Swiper('.tp-testimoinal-slider-active-3', {
      slidesPerView: 2,
      spaceBetween: 24,
      pagination: {
        el: ".tp-testimoinal-slider-dot-3",
        clickable: true
      },
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".tp-testimoinal-slider-button-next-3",
        prevEl: ".tp-testimoinal-slider-button-prev-3",
      },
      breakpoints: {
        '1200': {
          slidesPerView: 2,
        },
        '992': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 1,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      }
    });
  }
}
