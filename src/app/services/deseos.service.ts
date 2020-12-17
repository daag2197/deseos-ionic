import { Injectable } from '@angular/core';
import {Lista} from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];


  constructor() {
    const lista1 = new Lista('Prueba de Lista');
    const lista2 = new Lista('Prueba de Lista2');

    this.listas.push(lista1, lista2);

  }


}
