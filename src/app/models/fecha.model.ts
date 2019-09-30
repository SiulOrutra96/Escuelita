export enum DiaSemana {
    DOMINGO,
    LUNES,
    MARTES,
    MIERCOLES,
    JUEVES,
    VIERNES,
    SABADO
}

export enum Mes {
    ENERO,
    FEBRERO,
    MARZO,
    ABRIL,
    MAYO,
    JUNIO,
    JULIO,
    AGOSTO,
    SEPTIEMBRE,
    OCTUBRE,
    NOVIEMBRE,
    DICIEMBRE
}

export class Fecha {
    id: string;
    nombre: string;
    habil: boolean;
    inicioVacaciones: boolean;
    finVacaciones: boolean;
    diaSemana: DiaSemana;

    constructor(
        nombre?: string,
        habil?: boolean,
        inicioVacaciones?: boolean,
        finVacaciones?: boolean,
        diaSemana?: DiaSemana,
        id?: string
    ) {
        this.nombre = nombre ? nombre : undefined;
        this.habil = habil !== undefined ? habil : undefined;
        this.inicioVacaciones = inicioVacaciones !== undefined ? inicioVacaciones : undefined;
        this.finVacaciones = finVacaciones !== undefined ? finVacaciones : undefined;
        this.diaSemana = diaSemana ? diaSemana : undefined;
        this.id = id ? id : undefined;
    }
}
