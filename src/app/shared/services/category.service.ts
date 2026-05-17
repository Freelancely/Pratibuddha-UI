import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory, ISubCategory } from '@/shared/types/category-type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;
  
  // In-memory cache for categories
  private readonly categoriesCache$ = new BehaviorSubject<ICategory[] | null>(null);
  private readonly subcategoriesCache = new Map<string, ISubCategory[]>();

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all categories from backend with caching
   * Backend Categories = UI "Brands"
   */
  getAllCategories(): Observable<ICategory[]> {
    // Return from cache if available
    if (this.categoriesCache$.value) {
      return of(this.categoriesCache$.value);
    }

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.apiUrl}/category/get-all-categories`, { headers })
      .pipe(
        map(response => this.normalizeCategoryResponse(response)),
        tap(categories => {
          // Cache the result
          this.categoriesCache$.next(categories);
        }),
        catchError(error => {
          console.error('Error fetching categories:', error);
          return of([]);
        })
      );
  }

  /**
   * Get subcategories for a specific category
   * Backend SubCategories = UI "Categories" (child items)
   */
  getSubCategoriesByCategory(categoryId: string): Observable<ISubCategory[]> {
    // Return from cache if available
    if (this.subcategoriesCache.has(categoryId)) {
      return of(this.subcategoriesCache.get(categoryId)!);
    }

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.apiUrl}/subCategory/get-by-category/${categoryId}`, { headers })
      .pipe(
        map(response => this.normalizeSubCategoryResponse(response)),
        tap(subcategories => {
          // Cache the result
          this.subcategoriesCache.set(categoryId, subcategories);
        }),
        catchError(error => {
          console.error(`Error fetching subcategories for category ${categoryId}:`, error);
          return of([]);
        })
      );
  }

  private normalizeCategoryResponse(response: any): ICategory[] {
    let items: any[] = [];

    if (Array.isArray(response)) {
      items = response;
    } else if (response?.data && Array.isArray(response.data)) {
      items = response.data;
    } else if (response?.message && Array.isArray(response.message)) {
      items = response.message;
    } else if (response?.categories && Array.isArray(response.categories)) {
      items = response.categories;
    } else if (response?.data?.data && Array.isArray(response.data.data)) {
      items = response.data.data;
    }

    return items.map((item) => this.mapToCategory(item));
  }

  private normalizeSubCategoryResponse(response: any): ISubCategory[] {
    let items: any[] = [];

    if (Array.isArray(response)) {
      items = response;
    } else if (response?.data && Array.isArray(response.data)) {
      items = response.data;
    } else if (response?.message && Array.isArray(response.message)) {
      items = response.message;
    } else if (response?.subCategories && Array.isArray(response.subCategories)) {
      items = response.subCategories;
    } else if (response?.data?.data && Array.isArray(response.data.data)) {
      items = response.data.data;
    }

    return items.map((item) => this.mapToSubCategory(item));
  }

  private mapToCategory(item: any): ICategory {
    return {
      categoryId: item.categoryId || item.CategoryId || item.id || item._id || '',
      categoryName: item.categoryName || item.CategoryName || item.name || item.category || item.parent || '',
      subCategoryCount: item.subCategoryCount ?? item.SubCategoryCount ?? item.subCategoryCount ?? item.subCategoryTotal ?? 0,
      productCount: item.productCount ?? item.ProductCount ?? item.productCount ?? 0,
      productNames: item.productNames || item.ProductNames || [],
      id: item.id || item.categoryId || item.CategoryId || item._id,
      img: item.img || item.image || item.categoryImage || item.imageUrl,
      parent: item.parent || item.category || item.categoryName || item.name,
      children: Array.isArray(item.children) ? item.children : item.subCategories?.map((sub: any) => sub.subCategoryName || sub.name) || [],
      productType: item.productType || item.productTypeName || '',
      products: Array.isArray(item.products) ? item.products : [],
      status: item.status || item.isActive || ''
    };
  }

  private mapToSubCategory(item: any): ISubCategory {
    let subCatAttrs: any[] = [];
    if (Array.isArray(item.subCatAttrs)) {
      subCatAttrs = item.subCatAttrs;
    } else if (Array.isArray(item.attributes)) {
      subCatAttrs = item.attributes;
    }

    return {
      subCategoryId: item.subCategoryId || item.SubCategoryId || item.id || item._id || '',
      subCategoryName: item.subCategoryName || item.SubCategoryName || item.name || item.subCategory || '',
      categoryId: item.categoryId || item.CategoryId || item.category || item.category_id || item.parentId || '',
      subCatAttrs
    };
  }

  /**
   * Get all categories with their subcategories pre-loaded
   * Best for navigation as it reduces multiple API calls
   */
  getCategoriesWithSubcategories(): Observable<Map<ICategory, ISubCategory[]>> {
    return this.getAllCategories().pipe(
      tap(categories => {
        // Pre-fetch subcategories for each category
        categories.forEach(category => {
          if (!this.subcategoriesCache.has(category.categoryId)) {
            this.getSubCategoriesByCategory(category.categoryId).subscribe();
          }
        });
      }),
      map(categories => {
        const result = new Map<ICategory, ISubCategory[]>();
        categories.forEach(category => {
          const subs = this.subcategoriesCache.get(category.categoryId) || [];
          result.set(category, subs);
        });
        return result;
      }),
      catchError(error => {
        console.error('Error fetching categories with subcategories:', error);
        return of(new Map());
      })
    );
  }

  /**
   * Clear cache - useful when admin updates categories
   */
  clearCache(): void {
    this.categoriesCache$.next(null);
    this.subcategoriesCache.clear();
  }

  /**
   * Get headers for API calls
   */
  private getHeaders(): any {
    return {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };
  }
}
