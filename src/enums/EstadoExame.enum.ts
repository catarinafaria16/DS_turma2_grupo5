/*
 * EstadoExame — Estados possíveis de um exame clínico
 *
 * Ciclo normal: PENDENTE → REALIZADO → ANALISADO
 * O exame pode ser cancelado a qualquer momento antes de ser realizado.
 */
export enum EstadoExame {
    PENDENTE = 'PENDENTE',   // Exame prescrito mas ainda não realizado
    REALIZADO = 'REALIZADO', // Exame já feito — aguarda análise dos resultados
    ANALISADO = 'ANALISADO', // Resultados do exame já foram analisados pelo médico
    CANCELADO = 'CANCELADO'  // Exame cancelado (utente recusou ou já não é necessário)
}