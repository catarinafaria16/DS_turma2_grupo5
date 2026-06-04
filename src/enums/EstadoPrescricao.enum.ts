/*
 * EstadoPrescricao — Estados possíveis de uma prescrição médica
 *
 * Uma prescrição começa ATIVA quando o médico a emite.
 * Passa a DISPENSADA quando o utente levanta os medicamentos/faz os exames.
 * Pode ser CANCELADA pelo médico antes de ser usada.
 */
export enum EstadoPrescricao {
    ATIVA = 'ATIVA',           // Prescrição válida — ainda não foi utilizada
    DISPENSADA = 'DISPENSADA', // Prescrição usada — medicamentos levantados ou exames realizados
    CANCELADA = 'CANCELADA'    // Prescrição cancelada pelo médico antes de ser usada
}