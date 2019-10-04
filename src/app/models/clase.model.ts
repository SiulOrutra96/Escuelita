import { Grupo } from './grupo.model';
import { DiaSemana } from './fecha.model';

export enum HoraClase {
    '14:00' = 1,
    '14:50',
    '15:40',
    '16:30',
    '17:20',
    '18:10',
    '19:00',
}

export class Rasgo {
    nombre: string;
    porcentaje: number;

    constructor(nombre?: string, porcentaje?: number) {
        this.nombre = nombre ? nombre : undefined;
        this.porcentaje = porcentaje ? porcentaje : undefined;
    }
}

export class RasgosTrimestre {
    trimestre1: Rasgo[];
    trimestre2: Rasgo[];
    trimestre3: Rasgo[];

    constructor(trimestre1?: Rasgo[], trimestre2?: Rasgo[], trimestre3?: Rasgo[]) {
        this.trimestre1 = trimestre1 ? trimestre1 : [];
        this.trimestre2 = trimestre2 ? trimestre2 : [];
        this.trimestre3 = trimestre3 ? trimestre3 : [];
    }
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
    rasgos: RasgosTrimestre;

    maestroId: string;

    constructor(
        nombre?: string,
        dias?: DiaClase[],
        grupo?: Grupo,
        maestroId?: string,
        rasgos?: RasgosTrimestre,
        id?: string
    ) {
        this.nombre = nombre ? nombre : undefined;
        this.dias = dias ? dias : [new DiaClase()];
        this.grupo = grupo ? grupo : new Grupo();
        this.maestroId = maestroId ? maestroId : undefined;
        this.rasgos = rasgos ? rasgos : new RasgosTrimestre();
        this.id = id ? id : undefined;
    }
}