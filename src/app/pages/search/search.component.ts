import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: false
})
export class SearchComponent implements OnInit {
  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public searchText: string = '';
  public productType: string = '';
  public selectVal: string = '';
  public perView: number = 9;
  public sortBy: string = '';

  // shop changeFilterSelect
  changeFilterSelect(selectedOption: { value: string; text: string }) {
    this.sortByFilter(selectedOption.value);
  }
  // select option
  public selectOptions = [
    { value: 'ascending', text: 'Default Sorting' },
    { value: 'low-to-high', text: 'Low to Hight' },
    { value: 'high-to-low', text: 'High to Low' },
    { value: 'new-added', text: 'New Added' },
    { value: 'on-sale', text: 'On Sale' },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['searchText'] || '';
      this.productType = params['productType'] || '';
      this.selectVal = params['selectVal'] || '';
      this.sortBy = params['sortBy'] || '';

      this.productService.getProducts({ pageNumber: 1, pageSize: 100 }).subscribe((response: any) => {
        this.products = response.data;

        switch (this.sortBy) {
          case 'ascending':
            this.products = this.products.sort((a: IProduct, b: IProduct) => {
              if (a.productName < b.productName) {
                return -1;
              } else if (a.productName > b.productName) {
                return 1;
              }
              return 0;
            });
            break;

          case 'low-to-high':
            this.products = this.products.sort(
              (a: IProduct, b: IProduct) => Number(a.price ?? 0) - Number(b.price ?? 0)
            );
            break;

          case 'high-to-low':
            this.products = this.products.sort(
              (a: IProduct, b: IProduct) => Number(b.price ?? 0) - Number(a.price ?? 0)
            );
            break;

          case 'new-added':
            this.products = this.products.slice(-8);
            break;

          case 'on-sale':
            this.products = this.products.filter((p: IProduct) => (p.discount ?? 0) > 0);
            break;

          default:
            this.products = response.data;
            break;
        }

        if (this.searchText && !this.productType) {
          this.products = response.data.filter((prd: IProduct) =>
            prd.productName.toLowerCase().includes(this.searchText.toLowerCase())
          );
        }

        if (this.productType && !this.searchText) {
          this.products = response.data.filter(
            (prd: IProduct) =>
              prd.productType?.toLowerCase() === this.productType.toLowerCase()
          );
        }

        if (this.productType && this.searchText) {
          this.products = response.data
            .filter(
              (prd: IProduct) =>
                prd.productType?.toLowerCase() === this.productType.toLowerCase()
            )
            .filter((p: IProduct) =>
              p.productName.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
      });
    });
  }

  handlePerView(): void {
    this.perView += 3;
  }

  // SortBy Filter
  sortByFilter(value: string) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { sortBy: value ? value : null },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
}
