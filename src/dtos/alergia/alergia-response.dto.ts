/*
 * AlergiaResponseDto — Dados de uma alergia devolvidos pela API
 *
 * Estrutura das alergias nas respostas GET /api/alergias.
 * Espelha os dados da entidade Alergia da base de dados.
 */
import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';

export interface AlergiaResponseDto {
    id: number;                              // ID único da alergia
    anamnese_id: number;                     // ID da anamnese do utente
    descricao: string;                       // Descrição da alergia
    frequencia_crise: string;                // Frequência das crises (ex: "Sazonal")
    intensidade_crise: IntensidadeCriseAlergia; // Gravidade: LEVE, MODERADA ou GRAVE
}
