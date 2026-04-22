import { Component, OnInit } from '@angular/core';
import feature_data, { IFeature } from '@/data/feature-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-electronics',
    templateUrl: './electronics.component.html',
    styleUrls: ['./electronics.component.scss'],
    standalone: false
})
export class ElectronicsComponent implements OnInit {

  // featured_data
  public featured_data = [
    {
      id: 1,
      img: '/assets/img/electronics/featured/featured-fridge.jpg',
      title: 'Samsung Smart <br /> 4-Door Refrigerator',
      subtitle: 'Energy Efficient - 28 cu. ft. - Stainless Steel',
      save: 150,
    },
    {
      id: 2,
      img: '/assets/img/electronics/featured/featured-tv.jpg',
      title: 'LG OLED <br /> 4K Smart TV',
      subtitle: '65-inch - Infinite Contrast - WebOS included',
      save: 200,
    },
    {
      id: 3,
      img: '/assets/img/electronics/hero/hero-washer.jpg',
      title: 'Bosch Front Load  <br />Washing Machine',
      subtitle: 'EcoSilence Drive - 8kg Capacity - AntiVibration',
      save: 80,
    },
  ];

  // best sell products
  public products: IProduct[] = [];
  public feature_items: IFeature[] = feature_data;

  constructor(private sanitizer: DomSanitizer, public productService: ProductService) {}

  ngOnInit(): void {
    // Use getProducts with a default requestBody
    this.productService.getProducts({ pageNumber: 1, pageSize: 12 }).subscribe((response: any) => {
      this.products = response.data
        .filter((p: IProduct) => p.productType === "electronics" || p.category?.name === "Electronics")
        .slice()
        .sort((a: IProduct, b: IProduct) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
        .slice(0, 8);
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // instagram data
  public instagram_data = [
    { id: 1, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-1.jpg' },
    { id: 2, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-2.jpg' },
    { id: 3, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-3.jpg' },
    { id: 4, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-4.jpg' },
    { id: 5, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-5.jpg' },
    { id: 6, link: "https://www.instagram.com/", img: '/assets/img/electronics/instagram/instagram-6.jpg' },
  ];
}
