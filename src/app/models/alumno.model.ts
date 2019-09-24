export enum EstadoAsistencia {
    ASISTENCIA,
    FALTA,
    JUSTIFICACION
}

export class Asistencia {
    claseId: string;
    fechas: any = {};

    constructor(claseId?: string, fechas?: any) {
        this.claseId = claseId ? claseId : undefined;
        this.fechas = fechas ? fechas : {};
    }
}

export class Alumno {
    id: string;
    nombre: string;
    apellido: string;
    numeroLista: number;
    activo: boolean;
    asistencias: Asistencia[];

    grupoId: string;

    constructor(
        nombre?: string,
        apellido?: string,
        grupoId?: string,
        numeroLista?: number,
        asistencias?: Asistencia[],
        activo?: boolean,
        id?: string
    ) {
        this.nombre = nombre ? nombre : undefined;
        this.apellido = apellido ? apellido : undefined;
        this.grupoId = grupoId ? grupoId : undefined;
        this.numeroLista = numeroLista ? numeroLista : undefined;
        this.asistencias = asistencias ? asistencias : [];
        this.activo = activo !== undefined ? activo : true;
        this.id = id ? id : undefined;
    }
}
