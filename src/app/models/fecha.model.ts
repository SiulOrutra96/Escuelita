export enum DiaSemana {
    LUNES = 1,
    MARTES,
    MIERCOLES,
    JUEVES,
    VIERNES
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
