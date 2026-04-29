import { Component, signal, effect, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  template: `
    <button (click)="toggle()" class="theme-btn" [class.is-dark]="isDark()">
      <div #iconContainer class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2">

          @if (!isDark()) {
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
          } @else {
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          }
        </svg>
      </div>
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .theme-btn {
      --bg: #f4f4f5;
      --fg: #71717a;
      background: var(--bg);
      color: var(--fg);
      border: 1px solid #e4e4e7;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .is-dark {
      --bg: #18181b;
      --fg: #fbbf24;
      border-color: #27272a;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .icon-wrapper svg {
      width: 1rem;
      height: 1rem;
    }

    /* Modern Morphing Animation */
    .is-dark .icon-wrapper {
      transform: rotate(360deg) scale(1.1);
    }

    .theme-btn:active { transform: scale(0.9); }
  `
})
export class ThemeToggleComponent {
  isDark = signal(document.documentElement.classList.contains('dark'));

  // Using a viewChild signal for direct DOM access if manual WAAPI is needed
  iconContainer = viewChild<ElementRef>('iconContainer');

  constructor() {
    // Reactive side-effect for theme switching
    effect(() => {
      const dark = this.isDark();
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggle() {
    this.isDark.update(v => !v);
  }
}