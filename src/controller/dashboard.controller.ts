import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class DashboardController {
    private service = new DashboardService();

    async obterDashboard(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const dashboard = await this.service.obterDashboardUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: dashboard });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter dashboard' });
        }
    }
}
