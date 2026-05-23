import type { Request, Response } from 'express';
import { ExameService } from '../services/exame.service.js';
import type { CreateExameDto } from '../dtos/exame/create-exame.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class ExameController {
    private service = new ExameService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const exameData: CreateExameDto = req.body;
            const novoExame = await this.service.criar(exameData, utilizador);
            return res.status(201).json({ mensagem: 'Exame criado com sucesso', dados: novoExame });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar exame' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const exames = await this.service.listar(utilizador);
            return res.status(200).json({ dados: exames, total: exames.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar exames' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const exame = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: exame });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter exame' });
        }
    }

    async listarPorPrescricao(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { prescricaoId } = req.params;
            const exames = await this.service.listarPorPrescricao(Number(prescricaoId), utilizador);
            return res.status(200).json({ dados: exames, total: exames.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar exames por prescricao' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const exameData: CreateExameDto = req.body;
            const exameAtualizado = await this.service.atualizar(Number(id), exameData, utilizador);
            return res.status(200).json({ mensagem: 'Exame atualizado com sucesso', dados: exameAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar exame' });
        }
    }
}
