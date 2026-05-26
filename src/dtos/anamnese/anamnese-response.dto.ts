import { Tabagismo } from '../../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../../enums/SexoAnamnese.enum.js';

export interface AnamneseResponseDto {
    id: number;
    utente_id: number;
    historico_familiar: string;
    tabagismo: Tabagismo;
    sexo: SexoAnamnese;
}