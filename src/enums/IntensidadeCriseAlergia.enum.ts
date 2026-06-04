/*
 * IntensidadeCriseAlergia — Gravidade das crises alérgicas
 *
 * Classifica quão graves são as crises alérgicas do utente,
 * o que é relevante para ajustar o tratamento e o nível de vigilância.
 *
 * LEVE: sintomas ligeiros, sem impacto significativo na qualidade de vida
 * MODERADA: sintomas que afetam as atividades diárias
 * GRAVE: crises que podem requerer tratamento de emergência (ex: anafilaxia)
 */
export enum IntensidadeCriseAlergia {
    LEVE = 'LEVE',         // Crise leve — sintomas ligeiros e autolimitados
    MODERADA = 'MODERADA', // Crise moderada — afeta a qualidade de vida
    GRAVE = 'GRAVE'        // Crise grave — pode requerer assistência médica urgente
}