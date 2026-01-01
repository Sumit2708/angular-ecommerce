import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchStore {
  query = signal('');
}
