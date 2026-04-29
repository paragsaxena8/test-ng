import { Routes } from '@angular/router';
import { practiceRoutes } from './components/practice-registry';

const DASHBOARD_PATH = 'dashboard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DASHBOARD_PATH,
  },
  ...practiceRoutes,
  {
    path: '**',
    redirectTo: DASHBOARD_PATH,
  },
];
