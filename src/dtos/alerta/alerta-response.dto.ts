/*
 * AlertaResponseDto — Dados de um alerta clínico devolvidos pela API
 *
 * Estrutura dos alertas nas respostas GET /api/alertas.
 * Inclui as datas de criação e de última atualização de estado,
 * úteis para perceber a evolução do alerta ao longo do tempo.
 */
import { EstadoAlerta } from '../../enums/EstadoAlerta.enum.js';
import { TipoAlerta } from '../../enums/TipoAlerta.enum.js';
import type { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface AlertaResponseDto {
    id: number;                           // ID único do alerta
    utente_id: number;                    // ID do utente a que se refere
    medico_id: number;                    // ID do médico responsável
    regra_id: number;                     // ID da regra que gerou (0 ou null se manual)
    tipo: TipoAlerta;                    // Tipo: SCORE_BAIXO ou DETERIORACAO
    estado: EstadoAlerta;               // Estado atual: NOVO, VISTO, EM_SEGUIMENTO, FECHADO
    prioridade: PrioridadeRegraAlerta;  // Urgência: BAIXA, MEDIA, ALTA, MUITO_ALTA
    notas?: string;                      // Notas clínicas adicionadas
    data_criacao: Date;                  // Quando o alerta foi criado
    data_atualizacao_estado: Date;       // Quando o estado foi atualizado pela última vez
}