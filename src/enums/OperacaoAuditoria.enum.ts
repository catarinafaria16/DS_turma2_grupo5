/*
 * OperacaoAuditoria — Tipos de operações registadas no log de auditoria
 *
 * Classifica o que foi feito num determinado registo da base de dados,
 * para que o histórico seja claro e compreensível.
 */
export enum OperacaoAuditoria {
    CRIACAO = 'CRIACAO',       // Um novo registo foi criado na base de dados
    ALTERACAO = 'ALTERACAO',   // Um registo existente foi modificado
    ELIMINACAO = 'ELIMINACAO'  // Um registo foi apagado (logicamente)
}
