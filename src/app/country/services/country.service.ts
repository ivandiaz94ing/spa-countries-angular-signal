import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/REST-countries.interface';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';
import { Country } from '../interfaces/country.interface';

const Uri = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  // Un método privado para manejar las peticiones y la lógica de errores de forma centralizada
  private getCountries(url: string): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.toContries(resp)),
        // El error 404 de la API no debe ser un error que rompa la app,
        // sino un caso de "no se encontraron resultados".
        // Por eso, en caso de error, devolvemos un array vacío.
        catchError(() => of([]))
      );
  }


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const url = `${Uri}/capital/${query}`;
    return this.getCountries(url);
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const url = `${Uri}/name/${query}`;
    return this.getCountries(url).pipe(
      // Se mantiene el delay solo para este método si es necesario para simulación
      delay(1000)
    );
  }
  searchCountryByAlphaCode(code: string) {
    const url = `${Uri}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.toContries(resp)),
        map( countries => countries[0]),
        catchError((error) => {
          console.log('Error fetching', error);

          return throwError(
            () =>  new Error (`No se pudo encontrar un país con ese codigo: ${code}`)
          )
        })
      );
  }

}
