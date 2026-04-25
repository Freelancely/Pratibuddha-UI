import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from '@/shared/services/category.service';
import { IProduct } from '@/types/product-type';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-shop-area',
    templateUrl: './shop-area.component.html',
    styleUrls: ['./shop-area.component.scss'],
    standalone: false
})
export class ShopAreaComponent implements OnInit, OnDestroy {
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
  private destroy$ = new Subject<void>();

  activeTab: string = this.listStyle ? 'list' : 'grid';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private categoryService: CategoryService,
    private viewScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.activeTab = this.listStyle ? 'list' : 'grid';

    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      switchMap((params) => {
        this.minPrice = params['minPrice'] ? +params['minPrice'] : 0;
        this.maxPrice = params['maxPrice'] ? +params['maxPrice'] : this.productService.maxPrice;
        this.brand = params['brand'] ? params['brand'] : null;
        this.category = params['category'] ? params['category'] : null;
        this.subcategory = params['subcategory'] ? params['subcategory'] : null;
        this.status = params['status'] ? params['status'] : null;
        this.pageNo = params['page'] ? +params['page'] : 1;
        this.sortBy = params['sortBy'] ? params['sortBy'] : 'asc';

        return this.categoryService.getAllCategories().pipe(
          switchMap((categories) => {
            let categoryNameForApi = null;
            if (this.category) {
              const matched = categories.find(c => 
                c.categoryName.toLowerCase().replace('&', '').split(' ').join('-') === this.category
              );
              categoryNameForApi = matched ? matched.categoryName : this.category;
            }

            const apiFilters: any = {
              pageNumber: this.pageNo,
              pageSize: this.pageSize,
              minPrice: this.minPrice,
              maxPrice: this.maxPrice,
              categoryName: categoryNameForApi,
              subCategoryName: this.brand || this.subcategory,
            };

            if (this.status === 'on-sale') {
              apiFilters.hasDiscount = true;
            } else if (this.status === 'in-stock') {
              apiFilters.inStockOnly = true;
            } else if (this.status === 'out-of-stock') {
              apiFilters.inStockOnly = false;
            }

            return this.productService.filterProducts(apiFilters);
          })
        );
      })
    ).subscribe({
      next: (response) => {
        this.products = this.productService.sortProducts(response.data, this.sortBy);
        if (response.pagination) {
          this.paginate = response.pagination;
        } else {
          this.paginate = this.productService.getPager(response.data.length, this.pageNo, this.pageSize);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
