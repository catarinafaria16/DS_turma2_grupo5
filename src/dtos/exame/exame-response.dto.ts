import { EstadoExame } from '../../enums/EstadoExame.enum.js';

export interface ExameResponseDto {
    id: number;
    prescricao_id: number;
    tipo_exame: string;
    data: Date;
    resultado: object; // json
    consentimento: boolean;
    estado: EstadoExame;
    deleted_at?: Date;
}