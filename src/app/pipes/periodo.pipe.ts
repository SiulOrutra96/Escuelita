import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodo'
})
export class PeriodoPipe implements PipeTransform {

  transform(hora: string, ...args: any[]): any {
    const horaSeparada = hora.split(':');
    let fechaInicio = new Date();
    fechaInicio.setHours(+horaSeparada[0]);
    fechaInicio.setMinutes(+horaSeparada[1]);

    // sumar 50 min a la hora
    let fechaFin = new Date(fechaInicio.getTime() + 50 * 60 * 1000);
    return (fechaInicio.getHours() - 12) + ':' +
           horaSeparada[1] + ' - ' +
           (fechaFin.getHours() - 12) + ':' +
           (fechaFin.getMinutes() < 10 ? '0' + fechaFin.getMinutes() : fechaFin.getMinutes());
  }

}
