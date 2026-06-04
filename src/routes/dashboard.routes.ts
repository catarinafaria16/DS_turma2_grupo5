/*
 * ============================================================
 * dashboard.routes.ts — Rotas do painel de controlo clínico
 * ============================================================
 *
 * URL base: /api/dashboard
 *
 * O dashboard agrega informação clínica de um utente numa só resposta:
 * scores CARAT históricos, alertas ativos, sintomas e recomendações.
 *
 * Acessível por todos os perfis (mas cada um só vê os dados autorizados):
 *   - Utente: vê o seu próprio dashboard
 *   - Médico: vê o dashboard dos seus utentes
 *   - Admin: vê qualquer dashboard
 *
 * Rotas disponíveis:
 *   GET /api/dashboard/:utenteId — dashboard clínico de um utente
 */
import { Router } from 'express';
import { DashboardController } from '../controller/dashboard.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new DashboardController();

// GET /api/dashboard/:utenteId — Dashboard clínico completo de um utente
routes.get(
    '/:utenteId',
    autenticar,
    requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR),
    controller.obterDashboard.bind(controller)
);

export default routes;
