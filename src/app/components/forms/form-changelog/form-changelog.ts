import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type UserModel = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User';
  active: boolean;
  address: {
    city: string;
    pincode: string;
  };
};

type ChangeEntry = {
  path: string;
  from: any;
  to: any;
};

type SubmitLog = {
  submittedAt: string;
  changes: ChangeEntry[];
  snapshot: any;
};

@Component({
  selector: 'app-form-changelog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Reactive Form Submit Change Log (ignores external model patches)</h2>

    <div style="display:flex; gap:12px; flex-wrap: wrap; margin-bottom: 12px;" class="border p-4 rounded">
      <button type="button" (click)="loadFromServerA()" class="border border-green-500 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded">Load Model A (external)</button>
      <button type="button" (click)="loadFromServerB()" class="border border-yellow-500 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded">Load Model B (external)</button>
      <button type="button" (click)="resetToBaseline()" class="border border-red-500 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded">Reset to Baseline</button>
    </div>

    <form [formGroup]="form" (ngSubmit)="submit()" style="display:grid; gap:10px; max-width: 520px;" class="border p-4 rounded">
      <label>
        First Name *
        <input formControlName="firstName" class="border border-gray-300 rounded px-2 py-1 w-full" />
      </label>

      <label>
        Last Name *
        <input formControlName="lastName" class="border border-gray-300 rounded px-2 py-1 w-full" />
      </label>

      <label>
        Email *
        <input formControlName="email" class="border border-gray-300 rounded px-2 py-1 w-full" />
      </label>

      <label>
        Role
        <select formControlName="role" class="border border-gray-300 rounded px-2 py-1 w-full">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </label>

      <label style="display:flex; gap:8px; align-items:center;">
        <input type="checkbox" formControlName="active" class="border border-gray-300 rounded px-2 py-1" />
        Active
      </label>

      <fieldset formGroupName="address" class="border border-gray-300 rounded p-2 " style="padding:10px;">
        <legend>Address</legend>

        <label>
          City
          <input formControlName="city" class="border border-gray-300 rounded px-2 py-1 w-full" />
        </label>

        <label>
          Pincode
          <input formControlName="pincode" class="border border-gray-300 rounded px-2 py-1 w-full" />
        </label>
      </fieldset>

      <button class="border border-blue-500 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded" type="submit">Submit (log changes)</button>

      <div *ngIf="form.invalid && (form.dirty || form.touched)" style="color:crimson;">
        Form invalid - please fill required fields correctly.
      </div>
    </form>

    <hr />

    <h3>Baseline (last submit/load)</h3>
    <pre class="border border-gray-300 rounded p-2">{{ baselineValue | json }}</pre>

    <h3>Current Form Value</h3>
    <pre class="border border-gray-300 rounded p-2">{{ currentValue | json }}</pre>

    <hr />

    <h3>Submit Logs</h3>

    <div *ngIf="submitLogs.length === 0">No submits yet.</div>

    <div *ngFor="let log of submitLogs; let i = index" style="border:1px solid #ddd; padding:10px; margin-bottom:10px;" class="rounded">
      <div>
        <b>#{{ i + 1 }}</b> - {{ log.submittedAt }}
      </div>

      <div *ngIf="log.changes.length === 0" style="margin-top:8px;">
        No changes since last baseline.
      </div>

      <ul *ngIf="log.changes.length > 0" style="margin-top:8px;">
        <li *ngFor="let c of log.changes">
          <code>{{ c.path }}</code> :
          <span>from <code>{{ c.from | json }}</code></span>
          ->
          <span>to <code>{{ c.to | json }}</code></span>
        </li>
      </ul>

      <details>
        <summary>Submitted Snapshot</summary>
        <pre>{{ log.snapshot | json }}</pre>
      </details>
    </div>
  `,
})
export class FormChangelog {
  private fb = new FormBuilder();

  form = this.fb.group({
    firstName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    lastName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    email: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    role: this.fb.control<'Admin' | 'User'>('User', { nonNullable: true }),
    active: this.fb.control(true, { nonNullable: true }),
    address: this.fb.group({
      city: this.fb.control('', { nonNullable: true }),
      pincode: this.fb.control('', { nonNullable: true }),
    }),
  });

  submitLogs: SubmitLog[] = [];
  private lastSubmittedValue: any = this.clone(this.form.getRawValue());

  private serverUserA: UserModel = {
    firstName: 'Amit',
    lastName: 'Sharma',
    email: 'amit@company.com',
    role: 'User',
    active: true,
    address: { city: 'Pune', pincode: '411001' },
  };

  private serverUserB: UserModel = {
    firstName: 'Neha',
    lastName: 'Verma',
    email: 'neha@company.com',
    role: 'Admin',
    active: false,
    address: { city: 'Bengaluru', pincode: '560001' },
  };

  loadFromServerA() {
    this.populateFromExternalModel(this.serverUserA);
  }

  loadFromServerB() {
    this.populateFromExternalModel(this.serverUserB);
  }

  resetToBaseline() {
    this.form.reset(this.clone(this.lastSubmittedValue), { emitEvent: false });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const current = this.form.getRawValue();
    const changes = diffObject(this.lastSubmittedValue, current);

    this.submitLogs.unshift({
      submittedAt: new Date().toISOString(),
      changes,
      snapshot: this.clone(current),
    });

    this.lastSubmittedValue = this.clone(current);
    this.form.markAsPristine();
  }

  private populateFromExternalModel(model: UserModel) {
    this.form.reset(model, { emitEvent: false });
    this.lastSubmittedValue = this.clone(this.form.getRawValue());
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  get baselineValue() {
    return this.lastSubmittedValue;
  }

  get currentValue() {
    return this.form.getRawValue();
  }

  private clone<T>(v: T): T {
    return structuredClone ? structuredClone(v) : JSON.parse(JSON.stringify(v));
  }
}

function diffObject(prev: any, curr: any, basePath = ''): ChangeEntry[] {
  const changes: ChangeEntry[] = [];

  if (deepEqual(prev, curr)) return changes;

  const prevIsArr = Array.isArray(prev);
  const currIsArr = Array.isArray(curr);

  if (prevIsArr !== currIsArr || isPrimitive(prev) || isPrimitive(curr) || prev == null || curr == null) {
    changes.push({ path: basePath || '(root)', from: prev, to: curr });
    return changes;
  }

  if (prevIsArr && currIsArr) {
    const max = Math.max(prev.length, curr.length);
    for (let i = 0; i < max; i++) {
      const p = joinPath(basePath, String(i));
      changes.push(...diffObject(prev[i], curr[i], p));
    }
    return changes;
  }

  const keys = new Set<string>([...Object.keys(prev ?? {}), ...Object.keys(curr ?? {})]);

  for (const k of keys) {
    const p = joinPath(basePath, k);
    changes.push(...diffObject(prev?.[k], curr?.[k], p));
  }

  return changes;
}

function joinPath(base: string, key: string) {
  return base ? `${base}.${key}` : key;
}

function isPrimitive(v: any) {
  return v === null || v === undefined || typeof v !== 'object';
}

function deepEqual(a: any, b: any): boolean {
  if (Object.is(a, b)) return true;
  if (isPrimitive(a) || isPrimitive(b)) return Object.is(a, b);

  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);
  if (aIsArr !== bIsArr) return false;

  if (aIsArr && bIsArr) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const k of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!deepEqual(a[k], b[k])) return false;
  }

  return true;
}
