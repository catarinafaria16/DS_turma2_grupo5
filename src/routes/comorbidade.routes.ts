/*
 * ============================================================
 * comorbidade.routes.ts — Rotas da API para comorbilidades
 * ============================================================
 *
 * URL base: /api/comorbidades
 * Apenas médicos e administradores têm acesso.
 *
 * Rotas disponíveis:
 *   GET  /api/comorbidades                       — listar comorbilidades
 *   GET  /api/comorbidades/anamnese/:anamneseId  — comorbilidades de uma anamnese
 *   POST /api/comorbidades                       — registar comorbilidade
 *   GET  /api/comorbidades/:id                   — obter comorbilidade específica
 *   PUT  /api/comorbidades/:id                   — atualizar comorbilidade
 */
import { Router } from 'express';
import { ComorbidadeController } from '../controller/comorbidade.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new ComorbidadeController();

// Requer autenticação
routes.use(autenticar);
// Apenas médicos e administradores têm acesso
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/anamnese/:anamneseId', controller.listarPorAnamnese.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
