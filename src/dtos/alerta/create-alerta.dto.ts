/*
 * CreateAlertaDto — Dados necessários para criar um alerta clínico manualmente
 *
 * Os alertas são normalmente criados automaticamente pelo sistema quando
 * um score CARAT é preocupante. Este DTO é para criação manual pelo médico.
 *
 * O campo regra_id é opcional — só é preenchido quando o alerta é gerado
 * automaticamente por uma regra de alerta definida.
 */
import { EstadoAlerta } from '../../enums/EstadoAlerta.enum.js';
import { TipoAlerta } from '../../enums/TipoAlerta.enum.js';
import type { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface CreateAlertaDto {
    utente_id: number;                // ID do utente a que o alerta se refere
    medico_id: number;                // ID do médico responsável — quem deve tomar ação
    regra_id?: number;                // ID da regra que gerou o alerta (opcional — null se manual)
    tipo: TipoAlerta;                 // Tipo: SCORE_BAIXO ou DETERIORACAO
    estado: EstadoAlerta;             // Estado inicial: normalmente NOVO
    prioridade: PrioridadeRegraAlerta; // Urgência: BAIXA, MEDIA, ALTA ou MUITO_ALTA
    notas?: string;                   // Notas clínicas adicionais (opcional)
}
