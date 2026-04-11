import { Component, OnInit } from '@angular/core';
import feature_data, { IFeature } from '@/data/feature-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-beauty',
    templateUrl: './beauty.component.html',
    styleUrls: ['./beauty.component.scss'],
    standalone: false
})
export class BeautyComponent implements OnInit {

  // featured_data
  public featured_data = [
    {
      id: 1,
      img: '/assets/img/product/featured/revlon-illuminance.jpg',
      title: 'Revlon Iluminance <br /> Skin - Caring Foundation',
      subtitle: 'Revlon Iluminance - 1 OZ - Light Beige 117 - 48 Piece Lot',
      save: 72,
    },
    {
      id: 2,
      img: '/assets/img/product/featured/revlon-colorstay.jpg',
      title: 'Revlon Colorstay <br /> Endless Glow',
      subtitle: 'Liquid Highlighter 0.28 OZ - OPAL - 48 Piece Lot',
      save: 98,
    },
    {
      id: 3,
      img: '/assets/img/product/featured/carlys-lipstick.jpg',
      title: 'Ultra Matte  <br />Liquid Lipstick Red',
      subtitle: 'Hydrating Experience with our Non-Flaking, and Stain-Free Lipstick',
      save: 133,
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
        .filter((p: IProduct) => p.productType === "beauty")
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
    { id: 1, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-1.jpg' },
    { id: 2, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-2.jpg' },
    { id: 3, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-3.jpg' },
    { id: 4, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-4.jpg' },
    { id: 5, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-5.jpg' },
    { id: 6, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-6.jpg' },
  ];
}
