import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  template: `
    <h1 class="text-3xl font-bold underline">Dashboard</h1>
    <div class="flex flex-row gap-4 mt-4">
      @for(item of items; track item.title) {
      <a
        [routerLink]="item.link"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ item.title }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ item.description }}
        </p>
      </a>
      }
    </div>
  `,
  styles: [``],
  imports: [RouterLink],
})
export class Dashboard implements OnInit {
  items = [
    { title: 'Search Component', description: 'Description for Search Component', link: '/search' },
    { title: 'Infinite Scroll', description: 'Description for Infinite Scroll', link: '/infinite-scroll' },
    { title: 'Pagination', description: 'Description for Item 3', link: '/pagination' },
  ];

  constructor() {}
  ngOnInit() {}
}
