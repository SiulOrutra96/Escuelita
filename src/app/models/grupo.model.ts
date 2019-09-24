import { Clase } from './clase.model';

export class Grupo {
    id: string;
    nombre: string;

    constructor(nombre?: string, id?: string) {
        this.nombre = nombre ? nombre : undefined;
        this.id = id ? id : undefined;
    }
}
