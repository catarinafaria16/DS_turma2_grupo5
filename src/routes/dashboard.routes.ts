import { Router } from 'express';
import { DashboardController } from '../controller/dashboard.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new DashboardController();

// RF025-RF029: GET /api/dashboard/:utenteId
routes.get(
    '/:utenteId',
    autenticar,
    requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR),
    controller.obterDashboard.bind(controller)
);

export default routes;
