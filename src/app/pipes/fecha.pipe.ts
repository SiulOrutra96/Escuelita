import { Pipe, PipeTransform } from '@angular/core';
import { DiaSemana, Mes } from '../models/fecha.model';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  // DIA_SEMANA = Object.keys(DiaSemana).map(key => DiaSemana[key]).filter(value => typeof value === 'string') as string[];
  // MES = Object.keys(Mes).map(key => Mes[key]).filter(value => typeof value === 'string') as string[];

  transform(fecha: Date, ...args: string[]): any {
    if (args[0] === 'larga') {
      return DiaSemana[fecha.getDay()][0] + DiaSemana[fecha.getDay()].substr(1).toLowerCase() + ' ' +
             fecha.getDate() + ' de ' +
             Mes[fecha.getMonth()].toLowerCase() + ' de ' +
             fecha.getFullYear();
    } else {
      return fecha;
    }
  }

}
