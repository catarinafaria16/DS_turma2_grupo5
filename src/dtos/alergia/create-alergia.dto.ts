import { IntensidadeCrise } from '../../enums/IntensidadeCriseAlergia.enum';

export interface CreateAlergiaDto {
    anamnese_id: number;
    descricao: string;
    frequencia_crises: string;
    intensidade_crises: IntensidadeCrise;
}
