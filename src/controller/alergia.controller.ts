import type { Request, Response } from 'express';
import { AlergiaService } from '../services/alergia.service.js';

export class AlergiaController {
    private service: AlergiaService;

    constructor() {
        this.service = new AlergiaService();
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId, descricao, intensidade_crises, frequencia_crises } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaAlergia = await this.service.registarAlergia(utenteId, descricao, intensidade_crises, frequencia_crises, utilizadorIdLogado);
            res.status(201).json({ mensagem: 'Alergia criada com sucesso', dados: novaAlergia });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar alergia' });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const alergias = await this.service.listarAlergias(0);
            res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar alergias' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response): Promise<void> {
        try {
            const { anamneseId } = req.params;
            const alergias = await this.service.listarAlergias(Number(anamneseId));
            res.status(200).json({ dados: alergias, total: alergias.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar alergias por anamnese' });
        }
    }

    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const alergia = await this.service.obter(Number(id));
            res.status(200).json({ dados: alergia });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter alergia' });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const alergiaAtualizada = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            res.status(200).json({ mensagem: 'Alergia atualizada com sucesso', dados: alergiaAtualizada });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar alergia' });
        }
    }

    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar alergia' });
        }
    }
}
