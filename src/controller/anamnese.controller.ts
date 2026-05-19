import type { Request, Response } from 'express';
import { AnamneseService } from '../services/anamnese.service.js';
import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';

export class AnamneseController {
    private service = new AnamneseService();

    async criar(req: Request, res: Response) {
        try {
            const anamneseData: CreateAnamneseDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaAnamnese = await this.service.criar(anamneseData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Anamnese criada com sucesso', dados: novaAnamnese });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar anamnese' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const anamneses = await this.service.listar();
            return res.status(200).json({ dados: anamneses, total: anamneses.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar anamneses' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const anamnese = await this.service.obter(Number(id));
            return res.status(200).json({ dados: anamnese });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter anamnese' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const anamneses = await this.service.listarPorUtente(Number(utenteId));
            return res.status(200).json({ dados: anamneses, total: anamneses.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar anamneses do utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const anamneseData: CreateAnamneseDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const anamneseAtualizada = await this.service.atualizar(Number(id), anamneseData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Anamnese atualizada com sucesso', dados: anamneseAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar anamnese' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar anamnese' });
        }
    }
}
