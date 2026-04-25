import { Router  } from '@angular/router';
import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
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
    selector: 'app-header-category',
    templateUrl: './header-category.component.html',
    styleUrls: ['./header-category.component.scss'],
    standalone: false
})
export class HeaderCategoryComponent implements OnInit, OnDestroy {

 public categoryItems: CategoryWithSubs[] = [];
 public isActive: boolean = false;
 public isLoadingCategories: boolean = true;
 public hasError: boolean = false;
 private destroy$ = new Subject<void>();

 constructor(
   private router: Router, 
   private renderer: Renderer2,
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

 public handleActive(): void {
   this.isActive = !this.isActive;
 }

 /**
  * Navigate to shop page with parent category filter
  * Converts category name to URL-friendly slug
  */
 public handleParentCategory(value: string): void {
   const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
   this.router.navigate(['/shop'], { queryParams: { category: newCategory } });
   this.handleActive(); // Close the menu
 }

 /**
  * Navigate to shop page with subcategory filter
  * Converts subcategory name to URL-friendly slug
  */
 public handleSubCategory(value: string): void {
   const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
   this.router.navigate(['/shop'], { queryParams: { subcategory: newCategory } });
   this.handleActive(); // Close the menu
 }

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
