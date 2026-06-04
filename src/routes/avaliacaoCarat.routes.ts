/*
 * ============================================================
 * avaliacaoCarat.routes.ts — Rotas da API para modelos do questionário CARAT
 * ============================================================
 *
 * URL base: /api/avaliacoes-carat
 * Acessível por todos os perfis.
 *
 * Estas rotas gerem os MODELOS do questionário (as perguntas e opções de resposta),
 * não as respostas dos utentes (essas estão em /api/respostas-carat).
 *
 * Normalmente existe apenas uma versão ativa (versão 1) criada automaticamente.
 *
 * Rotas disponíveis:
 *   GET  /api/avaliacoes-carat       — listar versões do questionário disponíveis
 *   POST /api/avaliacoes-carat       — criar nova versão do questionário
 *   GET  /api/avaliacoes-carat/:id   — obter versão específica do questionário
 *   PUT  /api/avaliacoes-carat/:id   — atualizar questionário
 */
import { Router } from 'express';
import { AvaliacaoCaratController } from '../controller/avaliacaoCarat.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AvaliacaoCaratController();

// Requer autenticação
routes.use(autenticar);
// Todos os perfis podem aceder (para saber as perguntas antes de responder)
routes.use(requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
