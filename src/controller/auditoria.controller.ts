/*
 * ============================================================
 * auditoria.controller.ts — Controller do log de auditoria
 * ============================================================
 *
 * Este controller expõe o histórico de auditoria do sistema.
 * A auditoria regista quem fez o quê e quando — essencial para
 * conformidade legal e segurança em sistemas clínicos.
 *
 * ATENÇÃO: apenas administradores têm acesso à auditoria.
 *
 * Funcionalidades:
 *   - Listar todas as entradas de auditoria (com paginação)
 *   - Obter histórico de auditoria de um utilizador específico
 *   - Obter histórico de um registo específico (ex: todas as alterações a uma prescrição)
 *   - Ver as diferenças entre antes e depois de uma alteração
 *   - Apagar uma entrada de auditoria (para manutenção)
 */
import type { Request, Response } from 'express';
import { AuditoriaService } from '../services/auditoria.service.js';

export class AuditoriaController {
    private service = new AuditoriaService();

    async listar(req: Request, res: Response) {
        try {
            const limite = Math.min(Number(req.query['limite']) || 20, 100);
            const resultado = await this.service.listar(1, limite);
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

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.service.apagar(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar auditoria' });
        }
    }
}
