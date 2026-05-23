import type { Request, Response } from 'express';
import { AlergiaService } from '../services/alergia.service.js';

export class AlergiaController {
    private service = new AlergiaService();

    async criar(req: Request, res: Response) {
        try {
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaAlergia = await this.service.criar(req.body, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Alergia criada com sucesso', dados: novaAlergia });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar alergia' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const alergias = await this.service.listar();
            return res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alergias' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response) {
        try {
            const { anamneseId } = req.params;
            const alergias = await this.service.listarAlergias(Number(anamneseId));
            return res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alergias por anamnese' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const alergia = await this.service.obter(Number(id));
            return res.status(200).json({ dados: alergia });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter alergia' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const alergiaAtualizada = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Alergia atualizada com sucesso', dados: alergiaAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar alergia' });
        }
    }

}
