import { EspecialidadeMedico } from '../enums/EspecialidadeMedico.enum.js';

export class Medico {
    id: number;
    utilizador_id: number;
    especialidade: EspecialidadeMedico;
    contacto: string;

    constructor(
        id: number,
        utilizador_id: number,
        especialidade: EspecialidadeMedico,
        contacto: string
    ) {
        this.id = id;
        this.utilizador_id = utilizador_id;
        this.especialidade = especialidade;
        this.contacto = contacto;
    }
}
