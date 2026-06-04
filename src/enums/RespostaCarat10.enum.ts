/*
 * RespostaCarat10 — Opções de resposta para a pergunta 10 do CARAT
 *
 * A pergunta 10 é diferente das outras: pergunta com que frequência o utente
 * AUMENTOU o uso de medicamentos de resgate (ex: broncodilatador de alívio).
 *
 * Opções diferentes das perguntas 1-9:
 *   - Não toma medicamentos: não usa medicamentos de resgate → 3 pontos
 *   - Nunca: usa medicamentos mas nunca aumentou o uso → 3 pontos
 *   - Menos de 7 dias: aumentou o uso em menos de metade da semana → 2 pontos
 *   - 7 ou mais dias: aumentou o uso em mais de metade da semana → 0 pontos
 */
export enum RespostaCarat10 {
    Nao_Toma_Medicamentos = 0, // Não usa medicamentos de resgate → 3 pontos
    Nunca = 1,                 // Usa medicamentos mas não aumentou o uso → 3 pontos
    Menos_De_7_Dias = 2,       // Aumentou o uso em <7 dias na semana → 2 pontos
    _7_Ou_Mais_Dias = 3        // Aumentou o uso em ≥7 dias na semana → 0 pontos
}