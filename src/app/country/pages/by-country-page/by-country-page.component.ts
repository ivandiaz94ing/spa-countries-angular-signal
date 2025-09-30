import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  query = signal<string>('');
  countryService = inject(CountryService);

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!this.query()) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    },
  });

  onFast() {
    this.countryService.searchFastAPI().subscribe();
  }
}
