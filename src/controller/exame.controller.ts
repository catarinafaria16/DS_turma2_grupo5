import type { Request, Response } from 'express';
import { ExameService } from '../services/exame.service.js';
import type { CreateExameDto } from '../dtos/exame/create-exame.dto.js';

export class ExameController {
    private service = new ExameService();

    async criar(req: Request, res: Response) {
        try {
            const exameData: CreateExameDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoExame = await this.service.criar(exameData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Exame criado com sucesso', dados: novoExame });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar exame' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const exames = await this.service.listar();
            return res.status(200).json({ dados: exames, total: exames.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar exames' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exame = await this.service.obter(Number(id));
            return res.status(200).json({ dados: exame });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter exame' });
        }
    }

    async listarPorPrescricao(req: Request, res: Response) {
        try {
            const { prescricaoId } = req.params;
            const exames = await this.service.listarPorPrescricao(Number(prescricaoId));
            return res.status(200).json({ dados: exames, total: exames.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar exames por prescrição' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exameData: CreateExameDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const exameAtualizado = await this.service.atualizar(Number(id), exameData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Exame atualizado com sucesso', dados: exameAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar exame' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar exame' });
        }
    }
}
