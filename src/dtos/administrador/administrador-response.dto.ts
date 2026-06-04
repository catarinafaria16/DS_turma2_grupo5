/*
 * AdministradorResponseDto — Dados de um administrador devolvidos pela API
 *
 * Estrutura mínima: apenas o ID do administrador e a sua ligação ao Utilizador.
 * Para obter nome, email, etc., é necessário consultar o utilizador associado.
 */
export interface AdministradorResponseDto {
  id: number;              // ID único do administrador
  utilizador_id: number;   // ID do utilizador associado
  deleted_at?: Date;       // Data de eliminação lógica (null = ativo)
}