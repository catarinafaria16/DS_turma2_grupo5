/*
 * CreateRegraAlertaDto — Dados necessários para criar uma regra de alerta automático
 *
 * Define uma regra que o sistema verifica após cada preenchimento do CARAT.
 * Consoante a categoria, devem ser fornecidos campos diferentes:
 *   - LIMIAR_SCORE: obrigatório fornecer limiar_score (score ≤ X → alerta)
 *   - DETERIORACAO: obrigatório fornecer valor_deterioracao (piora > X → alerta)
 *
 * A regra pode ser criada por um médico (para os seus utentes) ou
 * por um administrador (para todo o sistema).
 */
import { CategoriaRegraAlerta } from '../../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface CreateRegraAlertaDto {
    medico_id?: number;                    // ID do médico criador (obrigatório se criado por médico)
    administrador_id?: number;             // ID do admin criador (obrigatório se criado por admin)
    utente_id?: number;                    // ID do utente específico (null = aplica-se a todos os utentes do médico)
    categoria: CategoriaRegraAlerta;       // Tipo de regra: LIMIAR_SCORE ou DETERIORACAO
    limiar_score?: number;                 // Score mínimo aceitável (obrigatório para LIMIAR_SCORE)
    valor_deterioracao?: number;           // Pontos de piora máximos aceitáveis (obrigatório para DETERIORACAO)
    prioridade: PrioridadeRegraAlerta;    // Prioridade dos alertas gerados por esta regra
    data_criacao: Date;                    // Data de criação da regra
}