import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.html',
  styleUrl: './app-pagination.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  pages: number[] = [];

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }

  prev() {
    this.changePage(this.currentPage - 1);
  }

  next() {
    this.changePage(this.currentPage + 1);
  }
}
