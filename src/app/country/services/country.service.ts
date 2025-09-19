import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/REST-countries.interface';
import { map, tap } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';

const Uri = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query : string){
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${Uri}/capital/${query}`)
    .pipe(
      map(resp => CountryMapper.toContries(resp)),
      //tap(countries => this.countries.set(countries)),
      // tap(c => console.log({c}))
    );
  }

}
