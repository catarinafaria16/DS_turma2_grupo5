export class Medico {
    id: number;
    utilizador_id: number;
    especialidade: string;
    contacto: string;

    constructor(
        id: number,
        utilizador_id: number,
        especialidade: string,
        contacto: string
    ) {
        this.id = id;
        this.utilizador_id = utilizador_id;
        this.especialidade = especialidade;
        this.contacto = contacto;
    }
}
