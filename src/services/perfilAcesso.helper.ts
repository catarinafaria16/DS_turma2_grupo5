/*
 * ============================================================
 * perfilAcesso.helper.ts — Funções auxiliares de controlo de acesso
 * ============================================================
 *
 * Este ficheiro contém funções utilitárias de uso frequente em vários services,
 * relacionadas com a identificação e permissões dos utilizadores autenticados.
 *
 * É como uma "caixa de ferramentas" partilhada — em vez de repetir o mesmo
 * código em cada service, centralizamos aqui e importamos onde necessário.
 */
import { AppDataSource } from '../database/data-source.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { Medico } from '../models/medico.entity.js';

/*
 * obterMedicoIdAutenticado — Obtém o ID interno do médico a partir do utilizador autenticado
 *
 * Problema: o token JWT guarda o ID do Utilizador, mas nós precisamos muitas vezes
 * do ID do Médico (que é diferente). Esta função faz essa "tradução".
 *
 * Se o utilizador autenticado não for um médico, lança um erro.
 * Se o médico não for encontrado na base de dados, lança um erro.
 *
 * Retorna: o ID do registo de Médico correspondente ao utilizador autenticado
 */
export async function obterMedicoIdAutenticado(utilizador: UtilizadorAutenticado): Promise<number> {
    // Garante que só médicos podem usar esta função
    if (utilizador.perfil !== PerfilUtilizador.MEDICO) {
        throw new Error('Perfil autenticado nao e medico');
    }

    // Procura o registo de Médico cujo utilizador_id corresponde ao utilizador autenticado
    const medico = await AppDataSource
        .getRepository(Medico)
        .findOne({ where: { utilizador_id: utilizador.id } });

    // Se não encontrar o médico, é um erro de dados (não deve acontecer em condições normais)
    if (!medico) {
        throw new Error('Medico autenticado nao encontrado');
    }

    // Devolve apenas o ID do médico (não o objeto completo)
    return medico.id;
}
