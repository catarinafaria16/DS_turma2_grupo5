import { IntensidadeSintoma } from '../../enums/IntensidadeSintoma.enum';

export interface SintomaResponseDto {
    id: number;
    utente_id: number;
    descricao: string;
    intensidade: IntensidadeSintoma;
    duracao: string;
    data_registo: Date;
}