import type { Request, Response } from 'express';
import { ComorbidadeService } from '../services/comorbidade.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class ComorbidadeController {
    private service = new ComorbidadeService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novaComorbidade = await this.service.criar(req.body, utilizador);
            return res.status(201).json({ mensagem: 'Comorbidade criada com sucesso', dados: novaComorbidade });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar comorbidade' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const comorbidades = await this.service.listar(utilizador);
            return res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { anamneseId } = req.params;
            const comorbidades = await this.service.listarPorAnamnese(Number(anamneseId), utilizador);
            return res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades por anamnese' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const comorbidade = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: comorbidade });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter comorbidade' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const comorbidadeAtualizada = await this.service.atualizar(Number(id), req.body, utilizador);
            return res.status(200).json({ mensagem: 'Comorbidade atualizada com sucesso', dados: comorbidadeAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar comorbidade' });
        }
    }
}
