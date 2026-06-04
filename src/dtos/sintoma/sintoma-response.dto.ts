/*
 * SintomaResponseDto — Dados de um sintoma clínico devolvidos pela API
 *
 * Estrutura dos sintomas nas respostas GET /api/sintomas.
 * Os sintomas são ordenados por data de registo decrescente (mais recentes primeiro).
 */
import { IntensidadeSintoma } from '../../enums/IntensidadeSintoma.enum.js';

export interface SintomaResponseDto {
    id: number;                        // ID único do registo de sintoma
    utente_id: number;                 // ID do utente que reportou
    descricao: string;                 // Descrição do sintoma
    intensidade: IntensidadeSintoma;  // Gravidade: LIGEIRA, MODERADA ou GRAVE
    duracao: string;                   // Há quanto tempo tem o sintoma
    data_registo: Date;               // Quando o sintoma foi registado no sistema
}