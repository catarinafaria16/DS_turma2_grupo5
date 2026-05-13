import { Tabagismo } from '../../enums/Tabagismo.enum.js';

export interface CreateAnamneseDto {
    utente_id: number;
    historico_familiar: string;
    tabagismo: Tabagismo;
}