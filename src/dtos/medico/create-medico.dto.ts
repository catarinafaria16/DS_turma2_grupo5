import { EspecialidadeMedico } from '../../enums/EspecialidadeMedico.enum.js';

export interface CreateMedicoDto {
    utilizador_id: number;
    especialidade: EspecialidadeMedico;
    contacto: string;
}
