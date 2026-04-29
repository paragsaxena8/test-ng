import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule],
})
export class InfiniteScroll {
  private readonly maxItems = 10_000;
  private readonly batchSize = 150;
  private readonly prefetchThreshold = 30;

  protected readonly itemSize = 56;
  protected readonly minBufferPx = this.itemSize * 8;
  protected readonly maxBufferPx = this.itemSize * 16;

  protected items: number[] = [];

  constructor() {
    this.loadMoreItems();
  }

  protected onScrolledIndexChange(index: number) {
    const shouldLoadMore = index + this.prefetchThreshold >= this.items.length;

    if (!shouldLoadMore || this.items.length >= this.maxItems) {
      return;
    }

    this.loadMoreItems();
  }

  protected trackByValue(_: number, value: number) {
    return value;
  }

  private loadMoreItems() {
    const start = this.items.length + 1;
    const end = Math.min(start + this.batchSize - 1, this.maxItems);

    if (start > end) {
      return;
    }

    const nextBatch = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    this.items = [...this.items, ...nextBatch];
  }
}
