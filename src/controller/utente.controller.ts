import type { Request, Response } from 'express';
import { UtenteService } from '../services/utente.service.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';

export class UtenteController {
    private service = new UtenteService();

    async criar(req: Request, res: Response) {
        try {
            const utenteData: CreateUtenteDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoUtente = await this.service.criar(utenteData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Utente criado com sucesso', dados: novoUtente });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar utente' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const utentes = await this.service.listar();
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utente = await this.service.obter(Number(id));
            return res.status(200).json({ dados: utente });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utenteData: CreateUtenteDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const utenteAtualizado = await this.service.atualizar(Number(id), utenteData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Utente atualizado com sucesso', dados: utenteAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar utente' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar utente' });
        }
    }

    async historicoClinico(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const historico = await this.service.historicoClinico(Number(id));
            return res.status(200).json({ dados: historico });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter histórico clínico' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const { medicoId } = req.params;
            const utentes = await this.service.listarPorMedico(Number(medicoId));
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes por médico' });
        }
    }
}
