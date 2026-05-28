import { EstadoExame } from '../../enums/EstadoExame.enum.js';
import { TipoExame } from '../../enums/TipoExame.enum.js';

export interface CreateExameDto {
    prescricao_id: number;
    tipo_exame: TipoExame;
    consentimento: boolean;
    estado: EstadoExame;
}