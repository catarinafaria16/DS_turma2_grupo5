import { Router } from 'express';
import { DashboardController } from '../controller/dashboard.controller.js';

const routes = Router();
const controller = new DashboardController();

// RF025-RF029: GET /api/dashboard/:utenteId
routes.get('/:utenteId', controller.obterDashboard.bind(controller));

export default routes;
