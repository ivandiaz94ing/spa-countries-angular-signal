import { Component, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  queryRecibido =  signal<string>('si o no');

   onSearch(query : string ){
    this.queryRecibido.set(query);
    console.log(query);
  }
 }
