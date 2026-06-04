/*
 * RespostaCarat1a9 — Opções de resposta para as perguntas 1 a 9 do CARAT
 *
 * Estas perguntas perguntam com que frequência o utente teve determinados
 * sintomas durante a semana anterior. Os valores são numéricos para facilitar
 * o cálculo do score total.
 *
 * ATENÇÃO: a pontuação é INVERSA ao valor:
 *   - Nunca (0) = 3 pontos (melhor situação)
 *   - QuaseTodosOsDias (3) = 0 pontos (pior situação)
 * Isto significa que um score mais alto = doença mais controlada.
 */
export enum RespostaCarat1a9 {
    Nunca = 0,                    // Nunca teve este sintoma na semana passada → 3 pontos
    AteUmOuDoisDias = 1,          // Teve em 1-2 dias da semana → 2 pontos
    MaisDeDoisDiasPorSemana = 2,  // Teve em mais de 2 dias da semana → 1 ponto
    QuaseTodosOsDias = 3          // Teve quase todos os dias → 0 pontos
}