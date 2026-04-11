import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
    selector: 'app-beauty-all-products',
    templateUrl: './beauty-all-products.component.html',
    styleUrls: ['./beauty-all-products.component.scss'],
    standalone: false
})
export class BeautyAllProductsComponent implements OnInit {
  @ViewChild('navActive') navActive!: ElementRef;
  @ViewChild('productTabMarker') productTabMarker!: ElementRef;

  active_tab: string = 'All Collection';
  tabs: string[] = ['All Collection', 'Trending', 'Beauty', 'Cosmetics'];
  allProducts: IProduct[] = [];

  constructor(private renderer: Renderer2, public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts({ pageNumber: 1, pageSize: 12 }).subscribe((response: any) => {
      this.allProducts = response.data.filter((p: IProduct) => p.productType === 'beauty');
    });
  }

  handleActiveMarker(event: Event, tab: string): void {
    this.active_tab = tab;
    const marker = this.productTabMarker.nativeElement;
    if (marker && event.target) {
      this.renderer.setStyle(marker, 'left', (event.target as HTMLButtonElement).offsetLeft + 'px');
      this.renderer.setStyle(marker, 'width', (event.target as HTMLButtonElement).offsetWidth + 'px');
    }
  }

  get filteredProducts(): IProduct[] {
    switch (this.active_tab) {
      case 'All Collection':
        return this.allProducts.slice(0, 8);
      case 'Trending':
        return this.allProducts.slice(-4);
      case 'Beauty':
        return this.allProducts.filter((p: IProduct) => p.categoryName === 'Discover Skincare');
      case 'Cosmetics':
        return this.allProducts.filter((p: IProduct) => p.categoryName === 'Awesome Lip Care');
      default:
        return [];
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.navActive && this.productTabMarker) {
        this.renderer.setStyle(this.productTabMarker.nativeElement, 'left', this.navActive.nativeElement.offsetLeft + 'px');
        this.renderer.setStyle(this.productTabMarker.nativeElement, 'width', this.navActive.nativeElement.offsetWidth + 'px');
      }
    }, 0);
  }
}
