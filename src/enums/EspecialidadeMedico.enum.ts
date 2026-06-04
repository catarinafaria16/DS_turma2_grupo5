/*
 * EspecialidadeMedico — Especialidades médicas disponíveis no sistema
 *
 * O sistema CARAT foca-se em doenças alérgicas respiratórias, pelo que
 * as especialidades incluem as mais relevantes para rinite e asma.
 */
export enum EspecialidadeMedico {
    PNEUMOLOGIA = 'PNEUMOLOGIA',                            // Especialidade das doenças do aparelho respiratório
    ALERGOLOGIA = 'ALERGOLOGIA',                            // Especialidade das alergias
    IMUNOALERGOLOGIA = 'IMUNOALERGOLOGIA',                  // Especialidade combinada de imunologia e alergologia
    MEDICINA_INTERNA = 'MEDICINA INTERNA',                  // Especialidade geral de medicina dos adultos
    MEDICINA_GERAL_FAMILIAR = 'MEDICINA GERAL E FAMILIAR',  // Médico de família / clínica geral
    OTORRINOLARINGOLOGIA = 'OTORRINOLARINGOLOGIA',          // Especialidade do ouvido, nariz e garganta (ORL)
    PEDIATRIA = 'PEDIATRIA',                                // Especialidade de medicina para crianças
    CIRURGIA_TORACICA = 'CIRURGIA TORACICA',               // Cirurgia do tórax e aparelho respiratório
}
