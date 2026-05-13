import { EstadoExame } from '../../enums/EstadoExame.enum';

export interface CreateExameDto {
    prescricao_id: number;
    tipo_exame: string;
    data_exame: Date;
    resultado: object; // json
    consentimento: boolean;
    estado: EstadoExame;
}