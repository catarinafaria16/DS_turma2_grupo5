import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
    private service = new DashboardService();

    async obterDashboard(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const dashboard = await this.service.obterDashboardUtente(Number(utenteId));
            return res.status(200).json({ dados: dashboard });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter dashboard' });
        }
    }
}
