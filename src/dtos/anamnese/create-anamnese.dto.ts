import { Tabagismo } from '../../enums/Tabagismo.enum';

export interface CreateAnamneseDto {
    utente_id: number;
    historico_familiar: string;
    tabagismo: Tabagismo;
}