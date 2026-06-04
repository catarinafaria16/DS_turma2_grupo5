/*
 * ============================================================
 * alergia.routes.ts — Rotas da API para alergias dos utentes
 * ============================================================
 *
 * URL base: /api/alergias
 * Apenas médicos e administradores têm acesso (não o próprio utente).
 *
 * Rotas disponíveis:
 *   GET  /api/alergias                       — listar alergias
 *   GET  /api/alergias/anamnese/:anamneseId  — alergias de uma anamnese específica
 *   POST /api/alergias                       — registar nova alergia
 *   GET  /api/alergias/:id                   — obter alergia específica
 *   PUT  /api/alergias/:id                   — atualizar alergia
 */
import { Router } from 'express';
import { AlergiaController } from '../controller/alergia.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AlergiaController();

// Requer autenticação
routes.use(autenticar);
// Apenas médicos e administradores têm acesso a dados de alergias
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/anamnese/:anamneseId', controller.listarPorAnamnese.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
