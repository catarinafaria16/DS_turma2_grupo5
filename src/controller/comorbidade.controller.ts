import type { Request, Response } from 'express';
import { ComorbidadeService } from '../services/comorbidade.service.js';

export class ComorbidadeController {
    private service = new ComorbidadeService();

    async criar(req: Request, res: Response) {
        try {
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaComorbidade = await this.service.criar(req.body, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Comorbidade criada com sucesso', dados: novaComorbidade });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar comorbidade' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const comorbidades = await this.service.listar();
            return res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response) {
        try {
            const { anamneseId } = req.params;
            const comorbidades = await this.service.listarPorAnamnese(Number(anamneseId));
            return res.status(200).json({ dados: comorbidades, total: comorbidades.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar comorbidades por anamnese' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const comorbidade = await this.service.obter(Number(id));
            return res.status(200).json({ dados: comorbidade });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter comorbidade' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const comorbidadeAtualizada = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Comorbidade atualizada com sucesso', dados: comorbidadeAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar comorbidade' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar comorbidade' });
        }
    }
}
