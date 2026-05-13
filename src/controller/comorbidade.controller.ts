import type { Request, Response } from 'express';
import { ComorbidadeService } from '../services/comorbidade.service.js';

export class ComorbidadeController {
    private service: ComorbidadeService;

    constructor() {
        this.service = new ComorbidadeService();
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaComorbidade = await this.service.criar(req.body, utilizadorIdLogado);
            res.status(201).json({ mensagem: 'Comorbidade criada com sucesso', dados: novaComorbidade });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar comorbidade' });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const comorbidades = await this.service.listar();
            res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response): Promise<void> {
        try {
            const { anamneseId } = req.params;
            const comorbidades = await this.service.listarPorAnamnese(Number(anamneseId));
            res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades por anamnese' });
        }
    }

    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const comorbidade = await this.service.obter(Number(id));
            res.status(200).json({ dados: comorbidade });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter comorbidade' });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const comorbidadeAtualizada = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            res.status(200).json({ mensagem: 'Comorbidade atualizada com sucesso', dados: comorbidadeAtualizada });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar comorbidade' });
        }
    }

    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar comorbidade' });
        }
    }
}
