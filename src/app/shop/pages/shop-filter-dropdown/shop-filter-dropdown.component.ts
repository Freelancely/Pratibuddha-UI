import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-shop-filter-dropdown',
  templateUrl: './shop-filter-dropdown.component.html',
  styleUrls: ['./shop-filter-dropdown.component.scss'],
  standalone: false
})
export class ShopFilterDropdownComponent implements OnInit, OnDestroy {
  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1000;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public category: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 12;
  public paginate: any = {};
  public sortBy: string = 'asc';
  public filter_dropdown: boolean = false;
  public loading: boolean = false;

  private destroy$ = new Subject<void>();
  private loadTrigger$ = new Subject<void>();
  activeTab: string = 'grid';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit() {
    // Listen to route changes and update filters
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.updateFiltersFromParams(params);
      this.loadTrigger$.next();
    });

    // Setup debounced loading for initial load and filter changes
    this.loadTrigger$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadProducts();
    });

    // Initial load trigger
    this.loadTrigger$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  handleFilterDropDown() {
    this.filter_dropdown = !this.filter_dropdown;
  }

  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value);
  }

  private updateFiltersFromParams(params: any) {
    this.minPrice = params['minPrice'] ? +params['minPrice'] : 0;
    this.maxPrice = params['maxPrice'] ? +params['maxPrice'] : this.productService.maxPrice;
    this.brand = params['brand'] ? params['brand'].toLowerCase().split(' ').join('-') : null;
    this.category = params['category'] ? params['category'].toLowerCase().split(' ').join('-') : null;
    this.status = params['status'] ? params['status'].toLowerCase().split(' ').join('-') : null;
    this.pageNo = params['page'] ? +params['page'] : 1;
    this.sortBy = params['sortBy'] ? params['sortBy'] : 'asc';
  }

  private loadProducts() {
    if (this.loading) return;

    this.loading = true;

    const requestBody: any = {
      pageNumber: this.pageNo,
      pageSize: this.pageSize
    };

    if (this.minPrice > 0) requestBody.minPrice = this.minPrice;
    if (this.maxPrice < this.productService.maxPrice) requestBody.maxPrice = this.maxPrice;

    if (this.status === 'on-sale') requestBody.hasDiscount = true;
    if (this.status === 'in-stock') requestBody.inStockOnly = true;

    if (this.category) {
      requestBody.categoryName = this.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    if (this.brand) {
      requestBody.subCategoryName = this.brand.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    console.log('🔥 API Request:', requestBody);

    this.productService.filterProducts(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = this.productService.sortProducts(response.data, this.sortBy);
          this.paginate = response.pagination;
          this.paginate.totalItems = response.pagination.totalCount;
          this.loading = false;
          this.scrollToProducts();
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.loading = false;
        }
      });
  }

  updateFilter(tags: any) {
    this.minPrice = tags.minPrice || 0;
    this.maxPrice = tags.maxPrice || this.productService.maxPrice;
    this.pageNo = 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        minPrice: this.minPrice > 0 ? this.minPrice : null,
        maxPrice: this.maxPrice < this.productService.maxPrice ? this.maxPrice : null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  sortByFilter(value: string) {
    this.sortBy = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value || null },
      queryParamsHandling: 'merge'
    });
  }

  setPage(page: number) {
    this.pageNo = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    }).then(() => {
      // Force reload of products after navigation
      this.loadProducts();
    });
    this.scrollToProducts();
  }

  handleResetFilter() {
    this.minPrice = 0;
    this.maxPrice = this.productService.maxPrice;
    this.category = null;
    this.status = null;
    this.brand = null;
    this.pageNo = 1;
    this.sortBy = 'asc';
    this.filter_dropdown = false;

    this.router.navigate(['/shop/shop-filter-dropdown'], {
      queryParams: {
        page: 1,
        sortBy: 'asc'
      }
    });
    this.scrollToProducts();
  }

  private scrollToProducts() {
    setTimeout(() => {
      this.viewScroller.scrollToAnchor('product-list');
    }, 100);
  }
}
