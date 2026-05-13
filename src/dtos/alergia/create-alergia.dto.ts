import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';

export interface CreateAlergiaDto {
    anamnese_id: number;
    descricao: string;
    frequencia_crise: string;
    intensidade_crise: IntensidadeCriseAlergia;
}
