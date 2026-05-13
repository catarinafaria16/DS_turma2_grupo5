import { Tabagismo } from '../../enums/Tabagismo.enum';

export interface AnamneseResponseDto {
    id: number;
    utente_id: number;
    historico_familiar: string;
    tabagismo: Tabagismo;
}