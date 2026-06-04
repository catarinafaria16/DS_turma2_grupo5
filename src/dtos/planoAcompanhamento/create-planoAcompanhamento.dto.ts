/*
 * CreatePlanoAcompanhamentoDto — Dados necessários para criar um plano de acompanhamento
 *
 * O plano de acompanhamento define o período e as condições do acompanhamento clínico.
 * A data_fim deve ser posterior à data_inicio (validado no service).
 * O estado é opcional — por defeito é ATIVO quando não especificado.
 */
import { EstadoPlanoAcompanhamento } from '../../enums/EstadoPlanoAcompanhamento.enum.js';

export interface CreatePlanoAcompanhamentoDto {
    medico_id: number;                      // ID do médico responsável pelo plano
    utente_id: number;                      // ID do utente a que o plano se destina
    frequencia_avaliacao: string;           // Com que regularidade deve ser avaliado (ex: "Mensal", "Trimestral")
    data_inicio: Date;                      // Data de início do plano de acompanhamento
    data_fim: Date;                         // Data prevista de fim do plano
    estado?: EstadoPlanoAcompanhamento;    // Estado inicial (opcional — por defeito ATIVO)
    recomendacao_medica: string;           // Indicações clínicas e recomendações do médico
}
