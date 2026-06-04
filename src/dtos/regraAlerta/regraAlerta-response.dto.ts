/*
 * RegraAlertaResponseDto — Dados de uma regra de alerta devolvidos pela API
 *
 * Estrutura das regras de alerta nas respostas GET /api/regras-alerta.
 * Consoante a categoria, apenas um dos campos (limiar_score ou valor_deterioracao)
 * tem valor — o outro é null.
 */
import { CategoriaRegraAlerta } from '../../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface RegraAlertaResponseDto {
    id: number;                           // ID único da regra
    medico_id: number;                    // ID do médico que criou (ou null se admin)
    administrador_id: number;             // ID do admin que criou (ou null se médico)
    categoria: CategoriaRegraAlerta;     // LIMIAR_SCORE ou DETERIORACAO
    limiar_score: number;                // Score mínimo (para LIMIAR_SCORE; null para outras)
    valor_deterioracao: number;          // Deterioração máxima permitida (para DETERIORACAO)
    prioridade: PrioridadeRegraAlerta;  // Prioridade dos alertas gerados
    data_criacao: Date;                  // Quando a regra foi criada
    deleted_at?: Date;                   // Data de eliminação lógica (null = ativa)
}