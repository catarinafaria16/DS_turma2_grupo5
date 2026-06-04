/*
 * ============================================================
 * auditoria.routes.ts — Rotas da API de auditoria
 * ============================================================
 *
 * ACESSO RESTRITO: apenas administradores podem aceder a estas rotas.
 * A auditoria contém informação sensível sobre quem alterou o quê.
 *
 * URL base: /api/auditoria
 *
 * Rotas disponíveis:
 *   GET    /api/auditoria                              — listar todas as entradas
 *   GET    /api/auditoria/utilizador/:utilizadorId     — entradas de um utilizador
 *   GET    /api/auditoria/tabela/:tabela/:tabelaId     — histórico de um registo específico
 *   GET    /api/auditoria/:id                          — obter uma entrada específica
 *   GET    /api/auditoria/:id/diferencas               — ver o que mudou numa alteração
 *   DELETE /api/auditoria/:id                          — apagar entrada de auditoria
 */
import { Router } from 'express';
import { AuditoriaController } from '../controller/auditoria.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AuditoriaController();

// Requer autenticação JWT
routes.use(autenticar);
// APENAS administradores têm acesso ao log de auditoria
routes.use(requirePerfil(PerfilUtilizador.ADMINISTRADOR));

routes.get('/utilizador/:utilizadorId', controller.listarPorUtilizador.bind(controller));
routes.get('/tabela/:tabela/:tabelaId', controller.listarHistorico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/diferencas', controller.obterDiferencas.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
