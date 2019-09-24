import { Grupo } from './grupo.model';
import { DiaSemana } from './fecha.model';

export enum HoraClase {
    '7:00' = 1,
    '8:00' = 2,
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '1:00',
}

export class DiaClase {
    dias: DiaSemana[];
    hora: HoraClase;

    constructor(dias?: DiaSemana[], hora?: HoraClase) {
        this.dias = dias ? dias : [];
        this.hora = hora ? hora : undefined;
    }
}

export class Clase {
    id: string;
    nombre: string;
    dias: DiaClase[];
    grupo: Grupo;

    maestroId: string;

    constructor(
        nombre?: string,
        dias?: DiaClase[],
        grupo?: Grupo,
        id?: string
    ) {
        this.nombre = nombre ? nombre : undefined;
        this.dias = dias ? dias : [new DiaClase()];
        this.grupo = grupo ? grupo : new Grupo();
        this.id = id ? id : undefined;
    }
}