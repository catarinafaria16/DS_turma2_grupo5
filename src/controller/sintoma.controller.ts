import type { Request, Response } from 'express';
import { SintomaService } from '../services/sintoma.service.js';

export class SintomaController {
    private service: SintomaService;

    constructor() {
        this.service = new SintomaService();
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoSintoma = await this.service.criar(req.body, utilizadorIdLogado);
            res.status(201).json({ mensagem: 'Sintoma criado com sucesso', dados: novoSintoma });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar sintoma' });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const sintomas = await this.service.listar();
            res.status(200).json({ dados: sintomas, total: sintomas.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar sintomas' });
        }
    }

    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const sintomas = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({ dados: sintomas, total: sintomas.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar sintomas do utente' });
        }
    }

    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const sintoma = await this.service.obter(Number(id));
            res.status(200).json({ dados: sintoma });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter sintoma' });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const sintomaAtualizado = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            res.status(200).json({ mensagem: 'Sintoma atualizado com sucesso', dados: sintomaAtualizado });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar sintoma' });
        }
    }

    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar sintoma' });
        }
    }
}
