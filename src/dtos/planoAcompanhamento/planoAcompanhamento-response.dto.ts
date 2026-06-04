/*
 * PlanoAcompanhamentoResponseDto — Dados de um plano de acompanhamento devolvidos pela API
 *
 * Estrutura dos planos nas respostas GET /api/planos-acompanhamento.
 */
import { EstadoPlanoAcompanhamento } from '../../enums/EstadoPlanoAcompanhamento.enum.js';

export interface PlanoAcompanhamentoResponseDto {
    id: number;                           // ID único do plano
    medico_id: number;                    // ID do médico responsável
    utente_id: number;                    // ID do utente
    frequencia_avaliacao: string;         // Periodicidade das consultas (ex: "Mensal")
    data_inicio: Date;                    // Data de início do acompanhamento
    data_fim: Date;                       // Data prevista de término
    estado: EstadoPlanoAcompanhamento;   // Estado: ATIVO, CONCLUIDO, SUSPENSO ou CANCELADO
    recomendacao_medica: string;         // Indicações e recomendações do médico
}