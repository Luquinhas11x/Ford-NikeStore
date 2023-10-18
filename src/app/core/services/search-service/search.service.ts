import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue = new Subject<string>();

  serachValue$ = this.searchValue.asObservable();

  constructor() { }

  setSearchValue(value: string) {
    this.searchValue.next(value)
  }
}
