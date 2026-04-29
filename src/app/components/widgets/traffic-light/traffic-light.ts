import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  template: `
    <section class="mx-auto w-full max-w-xl p-4 md:p-6">
      <h2 class="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Traffic Light</h2>
      <div
        class="inline-flex items-center justify-center gap-8 rounded-2xl border border-slate-700 bg-slate-900 p-4"
        [class.flex-col]="layout === 'vertical'"
        [class.flex-row]="layout === 'horizontal'"
      >
        <div
          class="h-20 w-20 rounded-full border-2 border-slate-200 transition-colors duration-300"
          [class.bg-red-500]="currentLight() === 'red'"
          [class.bg-slate-500]="currentLight() !== 'red'"
          [class.opacity-100]="currentLight() === 'red'"
          [class.opacity-60]="currentLight() !== 'red'"
        ></div>

        <div
          class="h-20 w-20 rounded-full border-2 border-slate-200 transition-colors duration-300"
          [class.bg-yellow-400]="currentLight() === 'yellow'"
          [class.bg-slate-500]="currentLight() !== 'yellow'"
          [class.opacity-100]="currentLight() === 'yellow'"
          [class.opacity-60]="currentLight() !== 'yellow'"
        ></div>

        <div
          class="h-20 w-20 rounded-full border-2 border-slate-200 transition-colors duration-300"
          [class.bg-emerald-500]="currentLight() === 'green'"
          [class.bg-slate-500]="currentLight() !== 'green'"
          [class.opacity-100]="currentLight() === 'green'"
          [class.opacity-60]="currentLight() !== 'green'"
        ></div>
      </div>
    </section>
  `,
  styles: [],
})
export class TrafficLight implements OnInit {
  @Input() layout: 'vertical' | 'horizontal' = 'horizontal';

  currentLight = signal<'red' | 'yellow' | 'green'>('green');
  lights: Array<{ color: 'red' | 'yellow' | 'green'; time: number }> = [
    { color: 'green', time: 3000 },
    { color: 'red', time: 4000 },
    { color: 'yellow', time: 500 },
  ];

  ngOnInit(): void {
    let currentIndex = 0;

    const cycleLight = () => {
      const light = this.lights[currentIndex];
      this.currentLight.set(light.color);

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % this.lights.length;
        cycleLight();
      }, light.time);
    };

    cycleLight();
  }
}
