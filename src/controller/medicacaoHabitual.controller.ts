import type { Request, Response } from 'express';
import { MedicacaoHabitualService } from '../services/medicacaoHabitual.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class MedicacaoHabitualController {
    private service = new MedicacaoHabitualService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novaMedicacao = await this.service.criar(req.body, utilizador);
            return res.status(201).json({ mensagem: 'Medicacao habitual criada com sucesso', dados: novaMedicacao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar medicacao habitual' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicacoes = await this.service.listar(utilizador);
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicacoes habituais' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { anamneseId } = req.params;
            const medicacoes = await this.service.listarPorAnamnese(Number(anamneseId), utilizador);
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicacoes habituais por anamnese' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const medicacao = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: medicacao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter medicacao habitual' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const medicacaoAtualizada = await this.service.atualizar(Number(id), req.body, utilizador);
            return res.status(200).json({ mensagem: 'Medicacao habitual atualizada com sucesso', dados: medicacaoAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar medicacao habitual' });
        }
    }
}
