import { IntensidadeSintoma } from '../../enums/IntensidadeSintoma.enum.js';

export interface CreateSintomaDto {
    utente_id: number;
    descricao: string;
    intensidade: IntensidadeSintoma;
    duracao: string;
    data_registo: Date;
}