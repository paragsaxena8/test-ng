import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchTerm = ''): any[] {
    if (!value || value.length === 0 || searchTerm.length === 0) {
      return value;
    }
    searchTerm = searchTerm.toLowerCase();
    return value.filter((user) => user.name.toLowerCase().includes(searchTerm));

  }
}
