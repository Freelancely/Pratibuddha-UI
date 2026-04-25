import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { mobile_menu } from '@/data/menu-data';
import { IMobileType } from '@/types/menu-d-type';
import { UtilsService } from '@/shared/services/utils.service';
import { CategoryService } from '@/shared/services/category.service';
import { ICategory, ISubCategory } from '@/shared/types/category-type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interface to hold category with its subcategories
interface CategoryWithSubs {
  category: ICategory;
  subcategories: ISubCategory[];
  isLoading: boolean;
}

@Component({
    selector: 'app-mobile-sidebar',
    templateUrl: './mobile-sidebar.component.html',
    styleUrls: ['./mobile-sidebar.component.scss'],
    standalone: false
})
export class MobileSidebarComponent implements OnInit, OnDestroy {

  @Input() product_type!: string;

  public mobile_menu: IMobileType[] = mobile_menu;
  public isCategoryActive: boolean = false;
  public openCategory: string = '';
  public isActiveMenu: string = '';
  public isToggleActive: string = '';
  public categoryItems: CategoryWithSubs[] = [];
  public isLoadingCategories: boolean = true;
  public hasError: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    public utilsService: UtilsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all categories and their subcategories from the backend
   */
  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.hasError = false;

    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories: ICategory[]) => {
          this.categoryItems = categories.map(category => ({
            category,
            subcategories: [],
            isLoading: true
          }));

          // Load subcategories for each category
          this.categoryItems.forEach((item) => {
            this.categoryService.getSubCategoriesByCategory(item.category.categoryId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (subcategories: ISubCategory[]) => {
                  item.subcategories = subcategories;
                  item.isLoading = false;
                },
                error: (error) => {
                  console.error(`Error loading subcategories for ${item.category.categoryName}:`, error);
                  item.isLoading = false;
                }
              });
          });

          this.isLoadingCategories = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.isLoadingCategories = false;
          this.hasError = true;
        }
      });
  }

  /**
   * Filter categories by product type (legacy - kept for compatibility)
   * @deprecated - Backend doesn't have productType concept, returning all categories
   */
  filterCategories(): CategoryWithSubs[] {
    // Since backend doesn't have productType, return all loaded categories
    return this.categoryItems;
  }

  toggleCategoryActive(): void {
    this.isCategoryActive = !this.isCategoryActive;
  }

  handleOpenSubMenu(title: string): void {
    this.isActiveMenu = (this.isActiveMenu === title) ? '' : title;
  }

  handleOpenSubCategory(title: string): void {
    if (title === this.openCategory) {
      this.openCategory = "";
    } else {
      this.openCategory = title;
    }
  }

  handleToggleActive = (type: string): void => {
    if (type === this.isToggleActive) {
      this.isToggleActive = "";
    } else {
      this.isToggleActive = type;
    }
  };

  /**
   * Track by function for ngFor performance optimization
   */
  trackByCategory(index: number, item: CategoryWithSubs): string {
    return item.category.categoryId;
  }

  /**
   * Track by function for subcategory ngFor
   */
  trackBySubcategory(index: number, subcategory: ISubCategory): string {
    return subcategory.subCategoryId;
  }
}
