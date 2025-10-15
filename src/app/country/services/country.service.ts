import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Query } from '@angular/core';
import { RESTCountry } from '../interfaces/REST-countries.interface';
import { catchError, delay, map, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';

const Uri = 'https://restcountries.com/v3.1';


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
      // delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener paises con ese query: ${query}`)
        );
      })

    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${Uri}/name/${query}`)
    .pipe(
      map( (resp) => CountryMapper.toContries(resp)),
      delay(2000),
      catchError((error) => {
        return [];
      })
    )
  }

  // searchFastAPI() {
  //   return this.http.get(nest).pipe(tap((m) => console.log(m)));
  // }
}
