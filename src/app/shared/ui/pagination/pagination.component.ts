import { IBlogType } from '@/types/blog-type';
import { IProduct } from '@/types/product-type';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent {
  @Input() products: IProduct[] | IBlogType[] = [];
  @Input() paginate: any = {};

  @Output() setPage: EventEmitter<number> = new EventEmitter<number>();

  get pages(): number[] {
    const totalPages = this.paginate.totalPages || 1;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  constructor() {}

  pageSet(page: number) {
    this.setPage.emit(page); // Emit the page number
  }
}
