/*
 * ============================================================
 * exame.routes.ts — Rotas da API para exames clínicos
 * ============================================================
 *
 * URL base: /api/exames
 *
 * Os exames estão sempre associados a uma prescrição.
 * Utentes podem consultar os seus exames.
 * Médicos prescrevem e atualizam exames dos seus utentes.
 *
 * Rotas disponíveis:
 *   GET  /api/exames                             — listar exames
 *   GET  /api/exames/prescricao/:prescricaoId    — exames de uma prescrição
 *   POST /api/exames                             — registar exame (médico/admin)
 *   GET  /api/exames/:id                         — obter exame específico
 *   PUT  /api/exames/:id                         — atualizar exame (médico/admin)
 */
import { Router } from 'express';
import { ExameController } from '../controller/exame.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new ExameController();

// Todas as rotas requerem autenticação
routes.use(autenticar);

// RNF001: o Utente pode consultar os proprios exames; registo e alteracao ficam reservados ao Medico e ao Administrador.
routes.get(
    '/prescricao/:prescricaoId',
    requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR),
    controller.listarPorPrescricao.bind(controller)
);
routes.get('/', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.get('/:id', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizar.bind(controller));


export default routes;
