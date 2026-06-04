/*
 * CreateMedicoDto — Dados necessários para criar um novo médico
 *
 * Um médico é sempre associado a um Utilizador existente.
 * O Utilizador deve ter perfil MEDICO para poder ser associado.
 *
 * Nota: o número de cédula médica é o identificador oficial da Ordem dos Médicos
 * e também é usado como identificador de login (em vez do ID interno).
 */
import { EspecialidadeMedico } from '../../enums/EspecialidadeMedico.enum.js';

export interface CreateMedicoDto {
    id?: number;                          // ID opcional — se não fornecido, deve coincidir com utilizador_id
    utilizador_id: number;                // ID do utilizador associado (deve ter perfil MEDICO)
    numero_cedula_medica: number;         // Número oficial de cédula da Ordem dos Médicos (único)
    especialidade: EspecialidadeMedico;  // Especialidade médica (ver enum EspecialidadeMedico)
    contacto: string;                     // Número de telefone português
}
