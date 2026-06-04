/*
 * PerfilUtilizador — Tipos de utilizadores do sistema
 *
 * Define os três perfis possíveis de utilizador, que controlam
 * o que cada pessoa pode ver e fazer na aplicação.
 *
 * ADMINISTRADOR: acesso total — gere médicos, utentes, configurações do sistema
 * MEDICO: acesso aos seus próprios utentes e dados clínicos relacionados
 * UTENTE: acesso apenas aos seus próprios dados clínicos e questionários
 */
export enum PerfilUtilizador {
    ADMINISTRADOR = 'ADMINISTRADOR', // Administrador do sistema — acesso total
    MEDICO = 'MEDICO',               // Médico — acesso aos seus utentes
    UTENTE = 'UTENTE'                // Paciente — acesso apenas aos seus próprios dados
}
