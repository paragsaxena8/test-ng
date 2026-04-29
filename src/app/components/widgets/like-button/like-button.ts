import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-like-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mx-auto w-full max-w-md p-4 md:p-6">
      <h2 class="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Like Button</h2>
      <button
        class="inline-flex h-11 items-center gap-2 rounded-full border-2 px-5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70"
        [class.border-rose-500]="isLiked()"
        [class.bg-rose-500]="isLiked()"
        [class.text-white]="isLiked()"
        [class.hover:bg-rose-600]="isLiked()"
        [class.border-slate-700]="!isLiked()"
        [class.bg-white]="!isLiked()"
        [class.text-slate-800]="!isLiked()"
        [class.hover:border-rose-500]="!isLiked()"
        [class.hover:text-rose-500]="!isLiked()"
        [disabled]="isLoading()"
        (click)="onBtnClick(currentAction())"
      >
        @if (!isLoading()) {
          <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <g>
              <path
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
              ></path>
            </g>
          </svg>
        }

        @if (isLoading()) {
          <svg width="16" height="16" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        }

        Like
      </button>
    </section>
    @if (errorMsg()) {
      <p class="mt-3 text-sm text-red-600 dark:text-red-400">{{ errorMsg() }}</p>
    }
  `,
  styles: [],
})
export class LikeBtnComponent {
  isLiked = signal(false);
  errorMsg = signal('');
  currentAction = signal<'like' | 'unlike'>('like');
  isLoading = signal(false);

  constructor(private http: HttpClient) {}

  onBtnClick(action: 'like' | 'unlike') {
    this.isLoading.set(true);
    this.errorMsg.set('');

    this.http
      .post<{ message: string }>(
        'https://questions.greatfrontend.com/api/questions/like-button',
        { action },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        },
      )
      .subscribe({
        next: (rsp: { message: string }) => {
          if (rsp.message === 'Success!') {
            this.isLiked.update((liked) => !liked);
            this.currentAction.set(this.isLiked() ? 'unlike' : 'like');
          }

          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMsg.set(err.error?.message || 'An error occurred. Please try again.');
          this.isLoading.set(false);
        },
      });
  }
}
