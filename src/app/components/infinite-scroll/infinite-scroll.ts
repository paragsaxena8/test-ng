import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.html',
  styleUrl: './infinite-scroll.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule],
})
export class InfiniteScroll {
  items: number[] = Array.from({ length: 200_000 }, (_, i) => i + 1);
}
