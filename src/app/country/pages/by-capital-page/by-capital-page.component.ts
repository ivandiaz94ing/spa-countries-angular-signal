import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { map, tap } from 'rxjs';
import { CountryMapper } from '../../mapper/country-mapper';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  placeholder = signal('Buscar por capital');
  countryService = inject(CountryService);
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);


  onSearch(query : string ){

    if(this.isLoading()) return;

    this.countryService.searchByCapital(query)
   .subscribe(contries => this.countries.set(contries))}
}
