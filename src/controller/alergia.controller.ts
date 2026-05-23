import type { Request, Response } from 'express';
import { AlergiaService } from '../services/alergia.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class AlergiaController {
    private service = new AlergiaService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novaAlergia = await this.service.criar(req.body, utilizador);
            return res.status(201).json({ mensagem: 'Alergia criada com sucesso', dados: novaAlergia });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar alergia' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const alergias = await this.service.listar(utilizador);
            return res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar alergias' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { anamneseId } = req.params;
            const alergias = await this.service.listarPorAnamnese(Number(anamneseId), utilizador);
            return res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar alergias por anamnese' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const alergia = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: alergia });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter alergia' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const alergiaAtualizada = await this.service.atualizar(Number(id), req.body, utilizador);
            return res.status(200).json({ mensagem: 'Alergia atualizada com sucesso', dados: alergiaAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar alergia' });
        }
    }
}
