/*
 * TipoAlerta — Tipos de alertas clínicos do sistema
 *
 * Classifica o motivo pelo qual um alerta foi gerado.
 *
 * SCORE_BAIXO: o score CARAT do utente está abaixo do limiar de controlo (<16)
 *   → A doença está mal controlada e requer atenção urgente
 *
 * DETERIORACAO: o score CARAT baixou significativamente face à avaliação anterior
 *   → A doença está a piorar progressivamente
 */
export enum TipoAlerta {
    SCORE_BAIXO = 'SCORE BAIXO',    // Score CARAT abaixo do limiar mínimo (<16 pontos)
    DETERIORACAO = 'DETERIORACAO',  // Score piorou muito em relação à avaliação anterior
}
