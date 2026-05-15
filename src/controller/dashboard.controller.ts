import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
    private service: DashboardService;

    constructor() {
        this.service = new DashboardService();
    }

    // RF025-RF029: Dashboard pessoal do Utente
    async obterDashboard(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const dashboard = await this.service.obterDashboardUtente(Number(utenteId));
            res.status(200).json({ dados: dashboard });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter dashboard' });
        }
    }
}
