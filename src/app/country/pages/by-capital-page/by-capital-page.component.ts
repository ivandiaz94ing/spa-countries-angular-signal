import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  placeholder = signal('Buscar por capital');
  countryService = inject(CountryService);
  query = signal<string>('');

  /*
Codigo para trabajar petion http mediante recurso que automatiza
/todos las validaciones. Esto trabaja con Promesas
*/
//Resource devuelve Promesa
// countryResource = resource({
//   params: () => ({ query: this.query() }),
//   loader: async ({ params }) => {
//     if (!this.query()) return [];
//     return await firstValueFrom(
//       this.countryService.searchByCapital(this.query())
//     );
//   },
// });

//rxResource devuelve observable
countryResource = rxResource({
  params: () => ({ query: this.query() }),
  stream :  ({ params }) => {
    if(!params.query) return of([]);

    return this.countryService.searchByCapital(params.query);
  },
});


//Codigo manual para realizar una peticion http
  // if (this.isLoading()) return;

  // this.isLoading.set(true);
  // this.isError.set(null);

  // this.countryService.searchByCapital(query).subscribe({
  //   next: (countries) => {
  //     this.isLoading.set(false);
  //     this.countries.set(countries);
  //   },
  //   error: (err) => {
  //     console.log(err);
  //     this.isLoading.set(false);
  //     this.isError.set(err);
  //     this.countries.set([]);
  //   },
  // });
}
