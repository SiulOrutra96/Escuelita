export enum EstadoAsistencia {
    ASISTENCIA,
    FALTA,
    JUSTIFICACION
}

export class Trimestre {
    calificacionRasgos: number[];
    calificacionFinal: number;

    constructor(calificacionRasgos?: number[], calificacionFinal?: number) {
        this.calificacionRasgos = calificacionRasgos ? calificacionRasgos : [];
        this.calificacionFinal = calificacionFinal ? calificacionFinal : undefined;
    }
}

export class CalificacionesRasgos {
    trimestre1: Trimestre;
    trimestre2: Trimestre;
    trimestre3: Trimestre;

    constructor(trimestre1?: Trimestre, trimestre2?: Trimestre, trimestre3?: Trimestre) {
        this.trimestre1 = trimestre1 ? trimestre1 : new Trimestre();
        this.trimestre2 = trimestre2 ? trimestre2 : new Trimestre();
        this.trimestre3 = trimestre3 ? trimestre3 : new Trimestre();
    }
}

export class ClaseAlumno {
    claseId: string;
    fechas: any = {};
    calificacion: number;
    rasgos: CalificacionesRasgos;

    constructor(claseId?: string, fechas?: any, rasgos?: CalificacionesRasgos, calificacion?: number) {
        this.claseId = claseId ? claseId : undefined;
        this.fechas = fechas ? fechas : {};
        this.rasgos = rasgos ? rasgos : new CalificacionesRasgos();
        this.calificacion = calificacion ? calificacion : undefined;
    }
}

export class Alumno {
    id: string;
    nombre: string;
    apellido: string;
    numeroLista: number;
    activo: boolean;
    clases: ClaseAlumno[];

    grupoId: string;

    constructor(
        nombre?: string,
        apellido?: string,
        grupoId?: string,
        numeroLista?: number,
        clases?: ClaseAlumno[],
        activo?: boolean,
        id?: string
    ) {
        this.nombre = nombre ? nombre : undefined;
        this.apellido = apellido ? apellido : undefined;
        this.grupoId = grupoId ? grupoId : undefined;
        this.numeroLista = numeroLista ? numeroLista : undefined;
        this.clases = clases ? clases : [];
        this.activo = activo !== undefined ? activo : true;
        this.id = id ? id : undefined;
    }
}
