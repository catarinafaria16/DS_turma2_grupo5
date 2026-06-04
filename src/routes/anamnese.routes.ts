/*
 * ============================================================
 * anamnese.routes.ts — Rotas da API para histórias clínicas (anamnese)
 * ============================================================
 *
 * URL base: /api/anamneses
 * Apenas médicos e administradores têm acesso.
 *
 * Rotas disponíveis:
 *   GET  /api/anamneses                     — listar anamneses
 *   GET  /api/anamneses/utente/:utenteId    — anamnese de um utente específico
 *   POST /api/anamneses                     — criar anamnese
 *   GET  /api/anamneses/:id                 — obter anamnese específica
 *   PUT  /api/anamneses/:id                 — atualizar anamnese
 */
import { Router } from 'express';
import { AnamneseController } from '../controller/anamnese.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AnamneseController();

// Requer autenticação
routes.use(autenticar);
// Apenas médicos e administradores têm acesso a anamneses
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
