/*
 * TipoPrescricao — Tipos de prescrições médicas
 *
 * Uma prescrição pode ser de dois tipos:
 *   MEDICACAO: autoriza o utente a levantar medicamentos na farmácia
 *   EXAME: autoriza o utente a realizar exames clínicos (análises, espirometria, etc.)
 */
export enum TipoPrescricao {
    MEDICACAO = 'MEDICACAO', // Prescrição de medicamentos
    EXAME = 'EXAME'          // Prescrição de exames clínicos
}