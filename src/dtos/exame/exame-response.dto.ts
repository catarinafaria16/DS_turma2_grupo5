import { EstadoExame } from '../../enums/EstadoExame.enum.js';

export interface ExameResponseDto {
    id: number;
    prescricao_id: number;
    tipo_exame: string;
    consentimento: boolean;
    estado: EstadoExame;
}