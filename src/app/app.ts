import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AppSidebar } from './sidebar/sticky-header/app-sidebar';
import { SiteHeader } from './sidebar/sticky-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmSidebarImports, AppSidebar, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
