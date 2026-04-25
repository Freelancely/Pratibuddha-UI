import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ICategory } from '@/shared/types/category-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from '@/shared/services/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss'],
    standalone: false
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  public categoryData: ICategory[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;
  activeQuery: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        this.activeQuery = queryParams['category'];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.hasError = false;

    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories: ICategory[]) => {
          this.categoryData = categories;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  handleCategoryRoute(value: string): void {
    const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-');

    // Define the query parameters as an object
    const queryParams: Params = {
      category: newCategory,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }

  trackByCategory(index: number, item: ICategory): string {
    return item.categoryId;
  }
}
