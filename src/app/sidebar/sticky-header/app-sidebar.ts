import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { data } from '../../shared/sidebar/data';
import { NavMain } from '../../shared/sidebar/nav-main';
import { NavUser } from '../../shared/sidebar/nav-user';

@Component({
	selector: 'app-sidebar',
	imports: [HlmSidebarImports, NgIcon, NavMain, NavUser],
	providers: [provideIcons({ lucideCommand })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmSidebarWrapper>
			<hlm-sidebar variant="inset">
				<hlm-sidebar-header>
					<ul hlmSidebarMenu>
						<li hlmSidebarMenuItem>
							<a hlmSidebarMenuButton size="lg" href="#">
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<ng-icon name="lucideCommand" class="text-base" />
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">Component Practice</span>
									<span class="truncate text-xs">Angular Library View</span>
								</div>
							</a>
						</li>
					</ul>
				</hlm-sidebar-header>

				<hlm-sidebar-content>
					<spartan-nav-main [items]="data.navMain" />
				</hlm-sidebar-content>
				<hlm-sidebar-footer>
					<spartan-nav-user [user]="data.user" />
				</hlm-sidebar-footer>
			</hlm-sidebar>
			<ng-content />
		</div>
	`,
})
export class AppSidebar {
	public readonly data = data;
}
