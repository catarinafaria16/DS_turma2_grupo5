/*
 * IntensidadeSintoma — Intensidade/gravidade de um sintoma reportado
 *
 * Classifica a intensidade com que o utente sente um determinado sintoma
 * (ex: pieira, falta de ar, corrimento nasal).
 */
export enum IntensidadeSintoma {
    LIGEIRA = 'LIGEIRA',   // Sintoma presente mas pouco incómodo
    MODERADA = 'MODERADA', // Sintoma notável, afeta as atividades quotidianas
    GRAVE = 'GRAVE'        // Sintoma intenso, limitante ou que requer atenção médica
}