/*
 * UtilizadorResponseDto — Dados de um utilizador devolvidos pela API
 *
 * Estrutura dos dados do utilizador nas respostas GET /api/utilizadores.
 * IMPORTANTE: A password NUNCA é incluída nas respostas da API por razões de segurança.
 */
import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface UtilizadorResponseDto {
    id: number;                   // ID único do utilizador
    nome: string;                 // Nome completo
    email: string;                // Email (único no sistema)
    perfil: PerfilUtilizador;    // Tipo: ADMINISTRADOR, MEDICO ou UTENTE
    genero: GeneroUtilizador;    // Género: FEMININO, MASCULINO ou OUTRO
    deleted_at?: Date;            // Data de eliminação lógica (null = ativo)
    // Nota: a password NÃO está incluída neste DTO por segurança
}