import { EstadoExame } from '../../enums/EstadoExame.enum.js';
import { TipoExame } from '../../enums/TipoExame.enum.js';

export interface ExameResponseDto {
    id: number;
    prescricao_id: number;
    tipo_exame: TipoExame;
    data: Date;
    consentimento: boolean;
    estado: EstadoExame;
}