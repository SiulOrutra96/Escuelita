export enum RolesUsuario {
    ADMINISTRADOR,
    MODERADOR,
    MAESTRO
}

export class Usuario {
    id: string;
    nombre: string;
    apellido: string;
    rol: RolesUsuario;

    constructor(
        nombre?: string,
        apellido?: string,
        rol?: RolesUsuario,
        id?: string
    ) {
        this.id = id ? id : undefined;
        this.nombre = nombre ? nombre : undefined;
        this.rol = rol ? rol : 1;
        this.apellido = apellido ? apellido : undefined;
    }
}
