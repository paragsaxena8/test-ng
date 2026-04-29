import { Route } from '@angular/router';
import { DrawerComponent } from './drawer/drawer';
import { FormChangelog } from './forms/form-changelog/form-changelog';
import { TransferList } from './forms/transfer-list/transfer-list';

type BasePracticeEntry = {
  title: string;
  path: string;
};

type EagerPracticeEntry = BasePracticeEntry & {
  component: Route['component'];
};

type LazyPracticeEntry = BasePracticeEntry & {
  loadComponent: Route['loadComponent'];
};

type PracticeEntry = EagerPracticeEntry | LazyPracticeEntry;

export type PracticeSection = {
  title: string;
  icon: 'lucideSquareTerminal' | 'lucideBookOpen' | 'lucideBot';
  items: PracticeEntry[];
};

export const practiceSections: PracticeSection[] = [
  {
    title: 'Overview',
    icon: 'lucideSquareTerminal',
    items: [
      {
        title: 'Dashboard',
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
  {
    title: 'Core Patterns',
    icon: 'lucideSquareTerminal',
    items: [
      {
        title: 'Search',
        path: 'search',
        loadComponent: () => import('./search/search').then((m) => m.Search),
      },
      {
        title: 'Infinite Scroll',
        path: 'infinite-scroll',
        loadComponent: () => import('./infinite-scroll/infinite-scroll').then((m) => m.InfiniteScroll),
      },
      {
        title: 'Pagination',
        path: 'pagination',
        loadComponent: () => import('./pagination-component/pagination-component').then((m) => m.Pagination),
      },
    ],
  },
  {
    title: 'Form Utilities',
    icon: 'lucideBookOpen',
    items: [
      {
        title: 'Form Changelog',
        path: 'form-changelog',
        component: FormChangelog,
      },
      {
        title: 'Transfer List',
        path: 'transfer-list',
        component: TransferList,
      },
    ],
  },
  {
    title: 'Interactive Widgets',
    icon: 'lucideBot',
    items: [
      {
        title: 'Drawer',
        path: 'drawer',
        loadComponent: () => import('./drawer/drawer').then((m) => m.DrawerComponent),
      },
      {
        title: 'Like Button',
        path: 'like-btn',
        loadComponent: () =>
          import('./widgets/like-button/like-button').then((m) => m.LikeBtnComponent),
      },
      {
        title: 'Traffic Light',
        path: 'traffic-light',
        loadComponent: () => import('./widgets/traffic-light').then((m) => m.TrafficLight),
      },
    ],
  },
];

export const practiceRoutes: Route[] = practiceSections.flatMap((section) =>
  section.items.map((item) => {
    if ('loadComponent' in item) {
      return {
        path: item.path,
        loadComponent: item.loadComponent,
      };
    }

    return {
      path: item.path,
      component: item.component,
    };
  }),
);
