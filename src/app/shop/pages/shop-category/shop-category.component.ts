import { Router } from '@angular/router';
import { ICategory } from '@/shared/types/category-type';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '@/shared/services/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-shop-category',
    templateUrl: './shop-category.component.html',
    styleUrls: ['./shop-category.component.scss'],
    standalone: false
})
export class ShopCategoryComponent implements OnInit, OnDestroy {
  public category_data: ICategory[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
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
          this.category_data = categories;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  handleCategory(parent: string): void {
    const category = parent.toLowerCase().split(' ').join('-');
    this.router.navigate(['/shop'], {
      queryParams: { category: category },
    });
  }

  trackByCategory(index: number, item: ICategory): string {
    return item.categoryId;
  }
}
