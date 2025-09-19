import { Country } from '../interfaces/country.interface';
import { RESTCountry, Flags } from '../interfaces/REST-countries.interface';


// crear un metodo estatico que reciba un RESTCountry y devuelva
// un Country


// crear un metodo estatico que reciba un arreglo de restcountry
// y devuelva un arreglo de country
export class CountryMapper {

  static toCountry(data: RESTCountry ): Country {

    return {
      cca2 : data.cca2,
      flag : data.flag,
      flagSvg : data.flags.svg,
      capital : data.capital,
      population : data.population,
      name : data.translations['spa'].common

    }
  }

  static toContries(items : RESTCountry[]): Country[]{
    return items.map(this.toCountry);
  }
}
