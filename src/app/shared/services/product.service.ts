import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct, IProductImage } from '@/types/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  public filterSelect = [
    { value: 'asc', text: 'Default Sorting' },
    { value: 'name-asc', text: 'Name: A - Z' },
    { value: 'name-desc', text: 'Name: Z - A' },
    { value: 'price-asc', text: 'Price: Low - High' },
    { value: 'price-desc', text: 'Price: High - Low' }
  ];
  public maxPrice = 1000;

  public activeImg: string | undefined;

  constructor(private http: HttpClient) {}

  getProducts(requestBody: any): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };

    return this.http.post(`${this.apiUrl}/product/view-products`, requestBody, { headers });
  }

  filterProducts(filters?: any): Observable<any> {
    const defaultRequest = {
      pageNumber: 1,
      pageSize: 12
    };

    const requestBody = { ...defaultRequest, ...filters };

    console.log('📡 Sending to API:', requestBody);

    return this.getProducts(requestBody).pipe(
      map(response => {
        const transformedProducts: IProduct[] = response.data.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          productDescription: item.productDescription,
          productImageUrl: item.productImageUrl.map((img: string) => ({ img } as IProductImage)), // Transform array of URLs to IProductImage[]
          productUnitPrice: item.productUnitPrice,
          discountId: item.discountId,
          discountedPrice: item.discountedPrice,
          discountPercentage: item.discountPercentage,
          productQuantity: item.productQuantity,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          subCategoryId: item.subCategoryId,
          subCategoryName: item.subCategoryName,
          sales: item.sales,
          productStatus: item.productStatus,
          avgRating: item.avgRating,
          reviewCount: item.reviewCount,
          hotdeals: item.hotdeals,
          attributes: item.attributes,
          parent: item.categoryName,
          brand: { name: item.subCategoryName },
          price: item.productUnitPrice,
          status: item.productStatus,
          discount: item.discountPercentage || 0,
          quantity: item.productQuantity
        }));

        return {
          data: transformedProducts,
          pagination: response.pagination,
          lowestPrice: response.lowestPrice,
          highestPrice: response.highestPrice
        };
      })
    );
  }

  sortProducts(products: IProduct[], sortBy: string): IProduct[] {
    let sorted = [...products];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case 'price-asc':
        sorted.sort((a, b) => (a.productUnitPrice ?? 0) - (b.productUnitPrice ?? 0));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.productUnitPrice ?? 0) - (a.productUnitPrice ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 12) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startIndex,
      endIndex,
      pages: this.getPages(totalPages, currentPage)
    };
  }

  private getPages(totalPages: number, currentPage: number) {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  handleImageActive(imgUrl: string): void {
    this.activeImg = imgUrl;
    console.log('Active image set to:', imgUrl);
  }
}
