import type { Request, Response } from 'express';
import { UtenteService } from '../services/utente.service.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class UtenteController {
    private service = new UtenteService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const utenteData: CreateUtenteDto = req.body;
            const novoUtente = await this.service.criar(utenteData, utilizador);
            return res.status(201).json({ mensagem: 'Utente criado com sucesso', dados: novoUtente });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar utente' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const utentes = await this.service.listar(utilizador);
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const utente = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: utente });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const utenteData: Partial<CreateUtenteDto> = req.body;
            const utenteAtualizado = await this.service.atualizar(Number(id), utenteData, utilizador);
            return res.status(200).json({ mensagem: 'Utente atualizado com sucesso', dados: utenteAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar utente' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            await this.service.apagar(Number(id), utilizador);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao apagar utente' });
        }
    }

    async historicoClinico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const historico = await this.service.historicoClinico(Number(id), utilizador);
            return res.status(200).json({ dados: historico });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter historico clinico' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const utentes = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes por medico' });
        }
    }
}
