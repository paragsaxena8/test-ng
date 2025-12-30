import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { FilterPipe } from '../../pipes/filter';

interface Suggestion {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styles: [
    `
      .h-3r {
        height: 3rem;
      }

      .autocomplete {
        display: none;
        position: relative;
        // overflow-y: auto;

        .input-box {
          width: 100%;
          position: absolute;
          z-index: 10;
          border: 1px solid #ccc;

          li {
            cursor: pointer;

            &:last-child {
              border-bottom: none;
            }

            &:first-child {
              border-top: none;
            }
          }
        }
      }

      .dropdown-toggle:focus + .autocomplete,
      .autocomplete:hover {
        display: block;
        transition: all 0.3s ease-in-out;
      }
    `,
  ],
  imports: [FormsModule, CommonModule, FilterPipe],
})
export class Search implements OnInit {
  searchQuery = signal<string>('');
  autocompleteQuery = signal<string>('');
  readonly showSuggestions = signal<boolean>(false);
  suggestions = signal<Suggestion[]>([]);

  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get<string[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map((users) => users.map((user:any) => ({ id: user.id, name: user.name, username: user.username, email: user.email })))
    )
    .subscribe((data: Suggestion[]) => {
      console.log(data);

      this.suggestions.set(data);
    });
  }

  search() {
    console.log(this.searchQuery());
  }

  selectSuggestion(suggestion: string) {
    this.autocompleteQuery.set(suggestion);
    this.showSuggestions.set(true);
  }

  onAutoCompleFocus() {
    this.showSuggestions.set(true);
  }
}
