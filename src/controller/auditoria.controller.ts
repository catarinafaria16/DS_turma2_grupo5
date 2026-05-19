import type { Request, Response } from 'express';
import { AuditoriaService } from '../services/auditoria.service.js';

export class AuditoriaController {
    private service = new AuditoriaService();

    async listar(_req: Request, res: Response) {
        try {
            const resultado = await this.service.listar();
            return res.status(200).json({ dados: resultado.auditorias, total: resultado.total });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar auditorias' });
        }
    }

    async listarPorUtilizador(req: Request, res: Response) {
        try {
            const { utilizadorId } = req.params;
            const auditorias = await this.service.obterAuditoriasPorUtilizador(Number(utilizadorId));
            return res.status(200).json({ dados: auditorias, total: auditorias.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar auditorias do utilizador' });
        }
    }

    async listarHistorico(req: Request, res: Response) {
        try {
            const { tabela, tabelaId } = req.params;
            const auditorias = await this.service.obterHistoricoAuditoria(String(tabela), Number(tabelaId));
            return res.status(200).json({ dados: auditorias, total: auditorias.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar histórico de auditoria' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const auditoria = await this.service.obter(Number(id));
            return res.status(200).json({ dados: auditoria });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter auditoria' });
        }
    }

    async obterDiferencas(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const diferencas = await this.service.obterDiferencas(Number(id));
            return res.status(200).json({ dados: diferencas });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter diferenças de auditoria' });
        }
    }
}
