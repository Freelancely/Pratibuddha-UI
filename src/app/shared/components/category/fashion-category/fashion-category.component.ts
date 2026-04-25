import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@/shared/services/category.service';
import { ICategory } from '@/shared/types/category-type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-fashion-category',
    templateUrl: './fashion-category.component.html',
    styleUrls: ['./fashion-category.component.scss'],
    standalone: false
})
export class FashionCategoryComponent implements OnInit, OnDestroy {
  categoryItems: ICategory[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
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
          // Since backend doesn't have productType, we show all categories
          this.categoryItems = categories;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  handleParentCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/shop'], { queryParams: { category: newCategory } });
  }

  trackByCategory(index: number, item: ICategory): string {
    return item.categoryId;
  }
}
