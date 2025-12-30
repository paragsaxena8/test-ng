import { Component, OnChanges } from '@angular/core';
import { PaginationComponent } from '../app-pagination/app-pagination';

@Component({
  selector: 'app-pagination-component',
  imports: [PaginationComponent],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.scss',
})
export class Pagination {
  items: string[] = Array.from({ length: 20 }, (_, i) => `item ${i + 1}`);

  constructor() {}

  totalItems = 20;
  pageSize = 10;
  page = 1;

  get pagedItems() {
    const start = (this.page - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }
}
