/*
 * ============================================================
 * prescricao.routes.ts — Rotas da API para prescrições médicas
 * ============================================================
 *
 * URL base: /api/prescricoes
 *
 * Nota sobre permissões:
 *   - Criar/atualizar prescrições: apenas médicos e admins
 *   - Consultar prescrições: todos os perfis (mas cada um só vê as suas)
 *
 * Rotas disponíveis:
 *   GET  /api/prescricoes                        — listar prescrições
 *   GET  /api/prescricoes/utente/:utenteId       — prescrições de um utente
 *   GET  /api/prescricoes/medico/:medicoId       — prescrições de um médico
 *   POST /api/prescricoes                        — criar prescrição (médico/admin)
 *   GET  /api/prescricoes/:id                    — obter prescrição específica
 *   PUT  /api/prescricoes/:id                    — atualizar prescrição (médico/admin)
 */
import { Router } from 'express';
import { PrescricaoController } from '../controller/prescricao.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new PrescricaoController();

// Todas as rotas requerem autenticação JWT
routes.use(autenticar);

routes.get('/utente/:utenteId', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorMedico.bind(controller));
routes.get('/', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.get('/:id', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizar.bind(controller));

export default routes;
