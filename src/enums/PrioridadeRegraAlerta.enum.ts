/*
 * PrioridadeRegraAlerta — Níveis de prioridade dos alertas clínicos
 *
 * Define a urgência com que o médico deve responder a um alerta.
 * Usado tanto nas regras de alerta como nos próprios alertas gerados.
 *
 * BAIXA: pode aguardar — monitorizar na próxima consulta
 * MEDIA: tratar em breve — rever tratamento nas próximas semanas
 * ALTA: urgente — contactar o utente em breve
 * MUITO_ALTA: muito urgente — doença mal controlada, requer ação imediata
 */
export enum PrioridadeRegraAlerta {
    BAIXA = 'BAIXA',         // Baixa urgência — monitorizar
    MEDIA = 'MEDIA',         // Urgência média — rever em breve
    ALTA = 'ALTA',           // Alta urgência — agir rapidamente
    MUITO_ALTA = 'MUITO ALTA' // Urgência máxima — doença mal controlada
}
