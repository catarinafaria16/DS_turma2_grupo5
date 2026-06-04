/*
 * CategoriaRegraAlerta — Categorias de regras de alertas automáticos
 *
 * Define o critério que a regra usa para decidir quando gerar um alerta.
 *
 * LIMIAR_SCORE: gera alerta quando o score CARAT é igual ou inferior a um valor limite
 *   Ex: "alertar sempre que o score for ≤ 16"
 *
 * DETERIORACAO: gera alerta quando o score piora mais de N pontos entre avaliações
 *   Ex: "alertar se o score baixar 5 ou mais pontos face à avaliação anterior"
 */
export enum CategoriaRegraAlerta {
    LIMIAR_SCORE = 'LIMIAR_SCORE', // Alerta quando score ≤ limiar_score definido na regra
    DETERIORACAO = 'DETERIORACAO'  // Alerta quando score piora mais de valor_deterioracao pontos
}
