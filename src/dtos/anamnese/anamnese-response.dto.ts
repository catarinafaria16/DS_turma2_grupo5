/*
 * AnamneseResponseDto — Dados da anamnese (história clínica) devolvidos pela API
 *
 * Estrutura da anamnese nas respostas GET /api/anamneses.
 */
import { Tabagismo } from '../../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../../enums/SexoAnamnese.enum.js';

export interface AnamneseResponseDto {
    id: number;                  // ID único da anamnese
    utente_id: number;           // ID do utente dono desta anamnese
    historico_familiar: string;  // Doenças na família
    tabagismo: Tabagismo;        // Situação tabágica
    sexo: SexoAnamnese;          // Sexo biológico (MASCULINO ou FEMININO)
}