import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <section
      class="min-h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 bg-gradient-to-b from-amber-50 via-slate-50 to-sky-50 p-5 dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
      <header class="mb-5">
        <p class="mb-2 text-xs uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">
          Practice Workspace
        </p>
        <h1 class="text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100">
          Component Bento Grid
        </h1>
        <p class="mt-2 max-w-3xl text-sm text-slate-700 dark:text-slate-300">
          Explore each practice component from a single motion-enabled dashboard.
        </p>
      </header>

      <div class="grid grid-cols-12 gap-4">
        @for (item of items; track item.title) {
          <a
            [routerLink]="item.link"
            class="group relative col-span-12 flex min-h-44 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/70"
            [class.md:col-span-7]="$index === 0"
            [class.md:col-span-5]="$index === 1"
            [class.md:col-span-4]="$index >= 2 && $index <= 4"
            [class.md:col-span-6]="$index >= 5"
            [class.ring-1]="item.featured"
            [class.ring-sky-400/40]="item.featured"
            [class.dark:ring-sky-300/30]="item.featured"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-amber-300/25 to-sky-300/25 transition-transform duration-300 group-hover:scale-110 dark:from-amber-200/10 dark:to-sky-200/10"
            ></div>
            <span
              class="mb-2 inline-flex w-fit rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              {{ item.tag }}
            </span>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ item.title }}</h2>
            <p class="mt-1 text-sm text-slate-700 dark:text-slate-300">{{ item.description }}</p>
            <span
              class="mt-auto pt-4 text-sm font-semibold text-sky-700 transition-colors duration-200 group-hover:text-sky-500 dark:text-sky-300 dark:group-hover:text-sky-200"
            >
              Open Component
            </span>
          </a>
        }
      </div>
    </section>
  `,
  styles: [],
  imports: [RouterLink],
})
export class Dashboard implements OnInit {
  items = [
    {
      title: 'Search',
      description: 'API-backed suggestion search and filtering practice.',
      link: '/search',
      tag: 'Data',
      featured: true,
    },
    {
      title: 'Infinite Scroll',
      description: 'Virtual scrolling and large-list rendering practice.',
      link: '/infinite-scroll',
      tag: 'Performance',
      featured: false,
    },
    {
      title: 'Pagination',
      description: 'Client-side list pagination with reusable controls.',
      link: '/pagination',
      tag: 'Patterns',
      featured: false,
    },
    {
      title: 'Form Changelog',
      description: 'Track submitted form deltas against baseline state.',
      link: '/form-changelog',
      tag: 'Forms',
      featured: true,
    },
    {
      title: 'Transfer List',
      description: 'Move selected items across dual-list selectors.',
      link: '/transfer-list',
      tag: 'State',
      featured: false,
    },
    {
      title: 'Like Button',
      description: 'Async request-driven toggle with loading and error states.',
      link: '/like-btn',
      tag: 'Async',
      featured: false,
    },
    {
      title: 'Traffic Light',
      description: 'Signal-driven timed state transitions and layout options.',
      link: '/traffic-light',
      tag: 'Signals',
      featured: false,
    },
  ];

  constructor() {}
  ngOnInit() {}
}
