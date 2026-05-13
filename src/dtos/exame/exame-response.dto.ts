import { EstadoExame } from '../../enums/EstadoExame.enum';

export interface ExameResponseDto {
    id: number;
    prescricao_id: number;
    tipo_exame: string;
    data_exame: Date;
    resultado: object; // json
    consentimento: boolean;
    estado: EstadoExame;
}