import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'search',
    loadComponent: () => import('./components/1-search/search').then((m) => m.Search),
  },
  {
    path: 'infinite-scroll',
    loadComponent: () =>
      import('./components/infinite-scroll/infinite-scroll').then((m) => m.InfiniteScroll),
  },
  {
    path: 'pagination',
    loadComponent: () =>
      import('./components/pagination-component/pagination-component').then((m) => m.Pagination),
  }
];
