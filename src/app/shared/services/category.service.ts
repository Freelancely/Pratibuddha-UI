import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory, ISubCategory } from '@/shared/types/category-type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  
  // In-memory cache for categories
  private categoriesCache$ = new BehaviorSubject<ICategory[] | null>(null);
  private subcategoriesCache = new Map<string, ISubCategory[]>();

  constructor(private http: HttpClient) {}

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
        map(response => {
          // Transform backend response to frontend ICategory format
          if (Array.isArray(response)) {
            return response as ICategory[];
          } else if (response.data && Array.isArray(response.data)) {
            return response.data as ICategory[];
          }
          return [];
        }),
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
        map(response => {
          // Transform backend response to frontend ISubCategory format
          if (Array.isArray(response)) {
            return response as ISubCategory[];
          } else if (response.data && Array.isArray(response.data)) {
            return response.data as ISubCategory[];
          }
          return [];
        }),
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
