/*
 * CreateAdministradorDto — Dados necessários para criar um novo administrador
 *
 * Criar um administrador é simples: basta associar um Utilizador existente
 * (que deve ter perfil ADMINISTRADOR) ao registo de administrador.
 */
export interface CreateAdministradorDto {
    utilizador_id: number; // ID do utilizador a associar como administrador
}