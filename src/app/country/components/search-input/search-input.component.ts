import { Component, input, output, Query } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  query= output<string>();

  //señal para recibir placeholder
  placeholder = input<string>('Buscar');

  notificar(valor: string){
    this.query.emit(valor);
  }
 }
