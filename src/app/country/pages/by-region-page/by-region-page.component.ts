import { Component, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  queryRecibido = signal<string>('si o no');

  onSearch(query : string ){
    this.queryRecibido.set(query);
    console.log(query);
  }
}
