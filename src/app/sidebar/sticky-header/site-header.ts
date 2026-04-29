import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HlmBreadCrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { ThemeToggleComponent } from '../../shared/toggle';
import { filter } from 'rxjs';

@Component({
  selector: 'site-header',
  imports: [HlmSidebarImports, HlmSeparatorImports, HlmBreadCrumbImports, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <button hlmSidebarTrigger></button>
        <hlm-separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <nav hlmBreadcrumb>
          <ol hlmBreadcrumbList>
            <li hlmBreadcrumbItem class="hidden sm:block">
              <a hlmBreadcrumbLink link="/dashboard">Component Library</a>
            </li>
            <li hlmBreadcrumbSeparator class="hidden sm:block"></li>
            <li hlmBreadcrumbItem>
              <span hlmBreadcrumbPage>{{ pageTitle() }}</span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="ml-auto right-0 flex items-center gap-4">
        <theme-toggle />
      </div>
    </header>
  `,
})
export class SiteHeader {
  private readonly router = inject(Router);
  protected readonly pageTitle = signal('Dashboard');

  constructor() {
    this.updatePageTitle(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updatePageTitle((event as NavigationEnd).urlAfterRedirects);
      });
  }

  private updatePageTitle(url: string) {
    const rawSegment = url.split('?')[0].replace(/^\//, '') || 'dashboard';
    const segment = rawSegment.split('/')[0];

    const title = segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    this.pageTitle.set(title);
  }
}
