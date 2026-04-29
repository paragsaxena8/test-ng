import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  template: `
    <div class="page">
      <button
        type="button"
        class="open-button"
        (click)="openDrawer()"
        aria-label="Open sidebar drawer"
      >
        Open Drawer
      </button>

      @if (isOpen()) {
        <div
          class="backdrop"
          animate.enter="backdrop-enter"
          animate.leave="backdrop-leave"
          (click)="closeDrawer()"
          aria-hidden="true"
        ></div>

        <aside
          class="drawer"
          animate.enter="drawer-enter"
          animate.leave="drawer-leave"
          role="dialog"
          aria-modal="true"
          aria-label="Sidebar drawer"
        >
          <div class="drawer-header">
            <h2>Sidebar</h2>
            <button
              type="button"
              class="close-button"
              (click)="closeDrawer()"
              aria-label="Close sidebar drawer"
            >
              ×
            </button>
          </div>

          <div class="drawer-body">
            <p>This sidebar opens when you click the button.</p>

            <nav class="menu">
              <a href="#">Dashboard</a>
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="#">Help</a>
            </nav>
          </div>
        </aside>
      }
    </div>
  `,
  styleUrls: ['./drawer.scss'],
})
export class DrawerComponent {
  readonly isOpen = signal(false);

  openDrawer(): void {
    this.isOpen.set(true);
  }

  closeDrawer(): void {
    this.isOpen.set(false);
  }
}
