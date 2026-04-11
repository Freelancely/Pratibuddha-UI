import { Component, ElementRef, Renderer2, ViewChild, Input, AfterViewInit } from '@angular/core';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-product-details-tab-nav',
    templateUrl: './product-details-tab-nav.component.html',
    styleUrls: ['./product-details-tab-nav.component.scss'],
    standalone: false
})
export class ProductDetailsTabNavComponent implements AfterViewInit {
  @ViewChild('navActive') navActive!: ElementRef;
  @ViewChild('productTabMarker') productTabMarker!: ElementRef;

  @Input() product!: IProduct;

  constructor(private renderer: Renderer2) {}

  handleActiveMarker(event: Event): void {
    const marker = this.productTabMarker.nativeElement;
    if (marker && event.target) {
      this.renderer.setStyle(marker, 'left', (event.target as HTMLButtonElement).offsetLeft + 'px');
      this.renderer.setStyle(marker, 'width', (event.target as HTMLButtonElement).offsetWidth + 'px');
    }
  }

  ngAfterViewInit() {
    if (this.navActive && this.productTabMarker) {
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'left', this.navActive.nativeElement.offsetLeft + 'px');
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'width', this.navActive.nativeElement.offsetWidth + 'px');
    }
  }
}
