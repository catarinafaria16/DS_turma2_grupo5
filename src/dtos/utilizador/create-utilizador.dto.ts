/*
 * CreateUtilizadorDto — Dados necessários para criar um novo utilizador
 *
 * Define os campos para o pedido POST /api/utilizadores (criação por admin)
 * ou POST /api/registar (registo público — limitado ao perfil UTENTE).
 *
 * Nota: o campo id é opcional. Se fornecido, deve coincidir com utilizador_id
 * do médico ou utente associado. Se omitido, é gerado automaticamente.
 */
import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface CreateUtilizadorDto {
    id?: number;                    // ID específico (opcional — normalmente gerado automaticamente)
    nome: string;                   // Nome completo do utilizador
    email: string;                  // Email único no sistema (usado para contacto e futuros acessos)
    password: string;               // Password de acesso (mínimo 6 caracteres)
    perfil: PerfilUtilizador;      // Tipo de utilizador: ADMINISTRADOR, MEDICO ou UTENTE
    genero: GeneroUtilizador;      // Género: FEMININO, MASCULINO ou OUTRO
}
