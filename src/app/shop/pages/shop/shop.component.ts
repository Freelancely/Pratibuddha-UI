import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    standalone: false
})
export class ShopComponent implements OnInit {
  @Input() listStyle: boolean = false;

  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = this.productService.maxPrice;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'asc'; // Sorting Order
  public mobileSidebar: boolean = false;

  activeTab: string = this.listStyle ? 'list' : 'grid';
  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // shop changeFilterSelect
  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
      this.minPrice = params['minPrice'] ? Number(params['minPrice']) : this.minPrice;
      this.maxPrice = params['maxPrice'] ? Number(params['maxPrice']) : this.maxPrice;
      this.brand = params['brand']
        ? params['brand'].toLowerCase().split(' ').join('-')
        : null;
      this.category = params['category']
        ? params['category'].toLowerCase().split(' ').join('-')
        : null;
      this.status = params['status']
        ? params['status'].toLowerCase().split(' ').join('-')
        : null;
      this.pageNo = params['page'] ? Number(params['page']) : this.pageNo;
      this.sortBy = params['sortBy'] ? params['sortBy'] : 'asc';

      // Get Filtered Products..
      this.productService.filterProducts().subscribe((response) => {
        // Sorting Filter
        this.products = this.productService.sortProducts(response.data, this.sortBy);
        console.log('this.products', this.products);

        // Category Filter
        if (this.category) {
          this.products = this.products.filter(
            (p) => p.parent?.toLowerCase().split(' ').join('-') === this.category
          );
        }
        // Status Filter
        if (this.status) {
          if (this.status === 'on-sale') {
            this.products = this.products.filter((p) => (p.discount ?? 0) > 0);
          } else if (this.status === 'in-stock') {
            this.products = this.products.filter((p) => p.status === 'in-stock');
          } else if (this.status === 'out-of-stock') {
            this.products = this.products.filter((p) => p.status === 'out-of-stock');
          }
        }
        // Brand Filtering
        if (this.brand) {
          this.products = this.products.filter(
            (p) => p.brand?.name?.toLowerCase() === this.brand
          );
        }

        // Price Filter
        this.products = this.products.filter(
          (p) => (p.price ?? 0) >= this.minPrice && (p.price ?? 0) <= this.maxPrice
        );
        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length, this.pageNo);
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1);
      });
    });
  }

  ngOnInit() {
    // console.log('pagination', this.paginate);
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    console.log('tags', tags);
    tags.page = null; // Reset Pagination
  }

  // SortBy Filter
  sortByFilter(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value || null },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products');
    });
  }

  // Product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products');
    });
  }

  handleResetFilter() {
    this.minPrice = 0;
    this.maxPrice = this.productService.maxPrice;
    this.router.navigate(['shop']);
  }
}
