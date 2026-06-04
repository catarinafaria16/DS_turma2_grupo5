/*
 * EstadoAlerta — Estados possíveis de um alerta clínico
 *
 * Um alerta começa em NOVO quando é gerado (automaticamente ou manualmente).
 * O médico avança o estado conforme trata o alerta.
 *
 * Ciclo típico: NOVO → VISTO → EM_SEGUIMENTO → FECHADO
 */
export enum EstadoAlerta {
    NOVO = 'NOVO',                   // Alerta recém-gerado, ainda não visto pelo médico
    VISTO = 'VISTO',                 // Médico já viu o alerta mas ainda não tomou ação
    EM_SEGUIMENTO = 'EM SEGUIMENTO', // Médico está a acompanhar ativamente a situação
    FECHADO = 'FECHADO'              // Alerta resolvido — situação tratada ou encerrada
}