/*
 * ============================================================
 * dashboard.controller.ts — Controller do painel de controlo clínico
 * ============================================================
 *
 * Este controller fornece os dados para o dashboard do utente —
 * uma visão consolidada do estado clínico com:
 *   - Estado atual da doença
 *   - Evolução histórica dos scores CARAT
 *   - Alertas ativos
 *   - Recomendações automáticas
 *   - Sintomas registados
 *
 * É acedido pelos médicos e pelos próprios utentes.
 */
import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class DashboardController {
    private service = new DashboardService();

    // GET /api/dashboard/utente/:utenteId — Obter dashboard completo de um utente
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
