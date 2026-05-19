import type { Request, Response } from 'express';
import { UtilizadorService } from '../services/utilizador.service.js';
import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto.js';

export class UtilizadorController {
    private service = new UtilizadorService();

    async criar(req: Request, res: Response) {
        try {
            const utilizadorData: CreateUtilizadorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoUtilizador = await this.service.criar(utilizadorData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Utilizador criado com sucesso', dados: novoUtilizador });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar utilizador' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const utilizadores = await this.service.listar();
            return res.status(200).json({ dados: utilizadores, total: utilizadores.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar utilizadores' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizador = await this.service.obter(Number(id));
            return res.status(200).json({ dados: utilizador });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter utilizador' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorData: CreateUtilizadorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const utilizadorAtualizado = await this.service.atualizar(Number(id), utilizadorData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Utilizador atualizado com sucesso', dados: utilizadorAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar utilizador' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar utilizador' });
        }
    }
}
