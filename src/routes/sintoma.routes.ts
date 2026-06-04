/*
 * ============================================================
 * sintoma.routes.ts — Rotas da API para sintomas clínicos
 * ============================================================
 *
 * URL base: /api/sintomas
 * Acessível por todos os perfis (utente, médico, admin).
 *
 * Rotas disponíveis:
 *   GET  /api/sintomas                    — listar sintomas (filtrado por perfil)
 *   GET  /api/sintomas/utente/:utenteId   — sintomas de um utente específico
 *   POST /api/sintomas                    — registar novo sintoma
 *   GET  /api/sintomas/:id                — obter sintoma específico
 *   PUT  /api/sintomas/:id                — atualizar sintoma
 */
import { Router } from 'express';
import { SintomaController } from '../controller/sintoma.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new SintomaController();

// Requer autenticação
routes.use(autenticar);
// Todos os perfis podem aceder (mas cada um só vê os seus dados)
routes.use(requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));

export default routes;
