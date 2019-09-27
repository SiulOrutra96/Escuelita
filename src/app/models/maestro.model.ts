export class Maestro {
    id: string;
    nombre: string;
    apellido: string;

    constructor(
        nombre?: string,
        apellido?: string,
        id?: string
    ) {
        this.id = id ? id : undefined;
        this.nombre = nombre ? nombre : undefined;
        this.apellido = apellido ? apellido : undefined;
    }
}
