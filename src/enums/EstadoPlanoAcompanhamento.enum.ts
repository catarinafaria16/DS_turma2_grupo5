/*
 * EstadoPlanoAcompanhamento — Estados possíveis de um plano de acompanhamento
 *
 * Um plano de acompanhamento tem um ciclo de vida desde que é criado
 * até que termina (por conclusão normal, suspensão ou cancelamento).
 */
export enum EstadoPlanoAcompanhamento {
    ATIVO = 'ATIVO',         // Plano em vigor — utente está a ser acompanhado
    CONCLUIDO = 'CONCLUIDO', // Plano concluído com sucesso — objetivos atingidos
    SUSPENSO = 'SUSPENSO',   // Plano temporariamente suspenso (ex: utente não compareceu)
    CANCELADO = 'CANCELADO'  // Plano cancelado definitivamente
}
