import type { Request, Response } from 'express';
import { RegraAlertaService } from '../services/regraAlerta.service.js';
import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class RegraAlertaController {
    private service = new RegraAlertaService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const regraData: CreateRegraAlertaDto = req.body;
            const novaRegra = await this.service.criar(regraData, utilizador);
            return res.status(201).json({ mensagem: 'Regra de alerta criada com sucesso', dados: novaRegra });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar regra de alerta' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const regras = await this.service.listar(utilizador);
            return res.status(200).json({ dados: regras, total: regras.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar regras de alerta' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const regra = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: regra });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter regra de alerta' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const regras = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: regras, total: regras.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar regras por medico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const regraData: CreateRegraAlertaDto = req.body;
            const regraAtualizada = await this.service.atualizar(Number(id), regraData, utilizador);
            return res.status(200).json({ mensagem: 'Regra de alerta atualizada com sucesso', dados: regraAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar regra de alerta' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            await this.service.apagar(Number(id), utilizador);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao apagar regra de alerta' });
        }
    }
}
