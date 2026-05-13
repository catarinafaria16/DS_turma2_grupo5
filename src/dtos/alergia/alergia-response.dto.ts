import { IntensidadeCrise } from '../../enums/IntensidadeCriseAlergia.enum';

export interface AlergiaResponseDto {
    id: number;
    anamnese_id: number;
    descricao: string;
    frequencia_crises: string;
    intensidade_crises: IntensidadeCrise;
}
