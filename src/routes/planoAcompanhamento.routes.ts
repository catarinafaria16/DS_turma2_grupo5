/*
 * ============================================================
 * planoAcompanhamento.routes.ts — Rotas da API para planos de acompanhamento
 * ============================================================
 *
 * URL base: /api/planos-acompanhamento
 *
 * Utentes podem consultar os seus planos.
 * Médicos criam e gerem planos dos seus utentes.
 * Admins têm acesso total.
 *
 * Rotas disponíveis:
 *   GET   /api/planos-acompanhamento                    — listar planos
 *   GET   /api/planos-acompanhamento/utente/:utenteId   — planos de um utente
 *   GET   /api/planos-acompanhamento/medico/:medicoId   — planos de um médico
 *   POST  /api/planos-acompanhamento                    — criar plano (médico/admin)
 *   GET   /api/planos-acompanhamento/:id                — obter plano específico
 *   PUT   /api/planos-acompanhamento/:id                — atualizar plano (médico/admin)
 *   PATCH /api/planos-acompanhamento/:id/estado         — alterar estado (médico/admin)
 */
import { Router } from 'express';
import { PlanoAcompanhamentoController } from '../controller/planoAcompanhamento.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new PlanoAcompanhamentoController();

// Todas as rotas requerem autenticação
routes.use(autenticar);

routes.get('/utente/:utenteId', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorMedico.bind(controller));
routes.get('/', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.get('/:id', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizar.bind(controller));
routes.patch('/:id/estado', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizarEstado.bind(controller));


export default routes;
