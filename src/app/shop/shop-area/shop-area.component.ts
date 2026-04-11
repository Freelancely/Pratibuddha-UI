import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
    selector: 'app-shop-area',
    templateUrl: './shop-area.component.html',
    styleUrls: ['./shop-area.component.scss'],
    standalone: false
})
export class ShopAreaComponent implements OnInit {
  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;

  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = this.productService.maxPrice;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public subcategory: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 9;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'asc'; // Sorting Order
  public mobileSidebar: boolean = false;

  activeTab: string = this.listStyle ? 'list' : 'grid';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private viewScroller: ViewportScroller
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      this.minPrice = params['minPrice'] ? +params['minPrice'] : this.minPrice;
      this.maxPrice = params['maxPrice'] ? +params['maxPrice'] : this.maxPrice;
      this.brand = params['brand'] ? params['brand'].toLowerCase().split(' ').join('-') : null;
      this.category = params['category'] ? params['category'].toLowerCase().split(' ').join('-') : null;
      this.subcategory = params['subcategory'] ? params['subcategory'].toLowerCase().split(' ').join('-') : null;
      this.status = params['status'] ? params['status'].toLowerCase().split(' ').join('-') : null;
      this.pageNo = params['page'] ? +params['page'] : this.pageNo;
      this.sortBy = params['sortBy'] ? params['sortBy'] : 'asc';

      // Get Filtered Products..
      this.productService.filterProducts().subscribe((response) => {
        // Sorting Filter
        this.products = this.productService.sortProducts(response.data, this.sortBy);
        // Category Filter
        if (this.category) {
          this.products = this.products.filter(
            (p) => p.categoryName && p.categoryName.toLowerCase().split(' ').join('-') === this.category
          );
        }
        if (this.subcategory) {
          this.products = this.products.filter(
            (p) => p.subCategoryName && p.subCategoryName.toLowerCase().replace("&", "").split(" ").join("-") === this.subcategory
          );
        }
        // Status Filter
        if (this.status) {
          if (this.status === 'on-sale') {
            this.products = this.products.filter((p) => p.discountPercentage !== undefined && p.discountPercentage !== null && p.discountPercentage > 0);
          } else if (this.status === 'in-stock') {
            this.products = this.products.filter((p) => p.productStatus === 'in-stock');
          } else if (this.status === 'out-of-stock') {
            this.products = this.products.filter((p) => p.productStatus === 'out-of-stock' || (p.productQuantity !== undefined && p.productQuantity === 0));
          }
        }
        // Brand Filtering
        if (this.brand) {
          this.products = this.products.filter((p) => p.brand && p.brand.name.toLowerCase() === this.brand);
        }

        // Price Filter
        this.products = this.products.filter(
          (p) => (p.productUnitPrice ?? 0) >= this.minPrice && (p.productUnitPrice ?? 0) <= this.maxPrice // Updated with ?? 0
        );
        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length, this.pageNo, this.pageSize);
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1);
      });
    });
  }

  ngOnInit() {
    this.activeTab = this.listStyle ? 'list' : 'grid';
  }

  // Append filter value to URL
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
  }

  // SortBy Filter based on nice-select change
  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value);
  }

  // SortBy Filter
  sortByFilter(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
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
    this.pageNo = 1;
    this.router.navigate(['shop']);
  }

  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
