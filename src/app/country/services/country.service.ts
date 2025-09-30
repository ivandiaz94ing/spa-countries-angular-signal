import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Query } from '@angular/core';
import { RESTCountry } from '../interfaces/REST-countries.interface';
import { catchError, map, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';

const Uri = 'https://restcountries.com/v3.1';
const fastApi = 'http://127.0.0.1:8000/hello'

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${Uri}/capital/${query}`)
    .pipe(
      map((resp) => CountryMapper.toContries(resp)),
      catchError((error) => {
        // console.log('Error fetching', error);||
        return throwError(
          () => new Error(`No se pudo obtener paises con ese query: ${query}`)
        );
      })
      //tap(countries => this.countries.set(countries)),
      // tap(c => console.log({c}))
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${Uri}/name/${query}`)
    .pipe(
      map( (resp) => CountryMapper.toContries(resp)),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener paises con ese query: ${query}`)
        )
      })
    )
  }

  searchFastAPI() {
    return this.http.get(fastApi).pipe(tap((m) => console.log(m)));
  }
}
