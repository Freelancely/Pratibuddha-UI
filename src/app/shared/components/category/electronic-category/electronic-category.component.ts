import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '@/shared/services/category.service';
import { ICategory } from '@/shared/types/category-type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-electronic-category',
    templateUrl: './electronic-category.component.html',
    styleUrls: ['./electronic-category.component.scss'],
    standalone: false
})
export class ElectronicCategoryComponent implements OnInit, OnDestroy {

  public category_items: ICategory[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private categoryService: CategoryService) {}

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
          this.category_items = categories;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  trackByCategory(index: number, item: ICategory): string {
    return item.categoryId;
  }
}
