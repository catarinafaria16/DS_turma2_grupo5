import { EspecialidadeMedico } from '../../enums/EspecialidadeMedico.enum.js';

export interface CreateMedicoDto {
    id?: number;
    utilizador_id: number;
    numero_cedula_medica: number;
    especialidade: EspecialidadeMedico;
    contacto: string;
}
