import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';

export interface AlergiaResponseDto {
    id: number;
    anamnese_id: number;
    descricao: string;
    frequencia_crise: string;
    intensidade_crise: IntensidadeCriseAlergia;
    deleted_at?: Date;
}
