import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-list',
  template: `
    <div class="content">
      <div class="list-view">
        @if (listA.length > 0) {
          @for (a of listA; track a) {
            <div class="input-list">
              <input
                type="checkbox"
                [name]="a"
                [id]="a"
                [checked]="selectedA.includes(a)"
                (change)="onSelectionChange($event, a, 'A')"
              />
              <span>{{ a }}</span>
            </div>
          }
        }
      </div>

      <div class="action-panel">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          [title]="'move all'"
          (click)="moveAllToLeft()"
        >
          <<
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          [disabled]="selectedB.length === 0"
          [title]="'move selected to left'"
          (click)="moveToLeft()"
        >
          <
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          [disabled]="selectedA.length === 0"
          [title]="'move to right'"
          (click)="moveToRight()"
        >
          >
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          [title]="'move all to right'"
          (click)="moveAllToRight()"
        >
          >>
        </button>
      </div>

      <div class="list-view">
        @for (b of listB; track b) {
          <div class="input-list">
            <input
              type="checkbox"
              [name]="b"
              [id]="b"
              [checked]="selectedB.includes(b)"
              (change)="onSelectionChange($event, b, 'B')"
            />
            <span>{{ b }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .content {
      display: flex;
      align-items: center;
      gap: 2rem;
      height: auto;
      width: 100%;
    }

    .list-view {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 2rem;
      border: 1px solid #333;
    }

    .action-panel {
      display: flex;
      width: fit-content;
      flex-direction: column;
      border: 1px solid #333;
      padding: 1rem;
      gap: 0.5rem;
    }

    .input-list {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
    }
  `,
})
export class TransferList {
  listA = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];
  listB = ['React', 'Angular', 'Vue', 'Svelte'];

  selectedA: string[] = [];
  selectedB: string[] = [];

  onSelectionChange(e: any, item: string, list: string) {
    const isChecked = e.target.checked;
    const selectedList = list === 'A' ? this.selectedA : this.selectedB;

    if (isChecked) {
      if (!selectedList.includes(item)) {
        selectedList.push(item);
      }
      return;
    }

    if (list === 'A') {
      this.selectedA = this.selectedA.filter((selectedItem) => selectedItem !== item);
      return;
    }

    this.selectedB = this.selectedB.filter((selectedItem) => selectedItem !== item);
  }

  moveToRight() {
    this.selectedA.forEach((item) => {
      this.listB.push(item);
    });

    this.listA = this.listA.filter((item) => !this.selectedA.includes(item));
    this.selectedA = [];
  }

  moveToLeft() {
    this.selectedB.forEach((item) => {
      this.listA.push(item);
    });

    this.listB = this.listB.filter((item) => !this.selectedB.includes(item));
    this.selectedB = [];
  }

  moveAllToRight() {
    this.listB = [...this.listA, ...this.listB];
    this.selectedA = [];
    this.listA = [];
  }

  moveAllToLeft() {
    this.listA = [...this.listB, ...this.listA];
    this.selectedB = [];
    this.listB = [];
  }
}
