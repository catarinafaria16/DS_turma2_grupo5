/*
 * ExameResponseDto — Dados de um exame clínico devolvidos pela API
 *
 * Estrutura dos exames nas respostas GET /api/exames.
 * O campo consentimento indica se o utente autorizou a realização do exame.
 */
import { EstadoExame } from '../../enums/EstadoExame.enum.js';

export interface ExameResponseDto {
    id: number;              // ID único do exame
    prescricao_id: number;   // ID da prescrição a que pertence
    tipo_exame: string;      // Tipo de exame (ex: "Espirometria")
    consentimento: boolean;  // true = utente deu consentimento
    estado: EstadoExame;    // Estado: PENDENTE, REALIZADO, ANALISADO ou CANCELADO
}