import type { Request, Response } from 'express';
import { UtenteService } from '../services/utente.service.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';

export class UtenteController {
    private service: UtenteService;

    constructor() {
        this.service = new UtenteService();
    }

    /* Criar novo utente */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utenteData: CreateUtenteDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoUtente = await this.service.criar(utenteData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Utente criado com sucesso',
                dados: novoUtente
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar utente' });
        }
    }

    /* Listar todos os utentes */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utentes = await this.service.listar();
            res.status(200).json({
                dados: utentes,
                total: utentes.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar utentes' });
        }
    }

    /* Obter utente por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utente = await this.service.obter(Number(id));
            res.status(200).json({ dados: utente });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter utente' });
        }
    }

    /* Atualizar utente */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utenteData: CreateUtenteDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const utenteAtualizado = await this.service.atualizar(Number(id), utenteData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Utente atualizado com sucesso',
                dados: utenteAtualizado
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar utente' });
        }
    }

    /* Apagar utente */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar utente' });
        }
    }

    /* RF031: Histórico clínico completo do utente */
    async historicoClinico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const historico = await this.service.historicoClinico(Number(id));
            res.status(200).json({ dados: historico });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter histórico clínico' });
        }
    }

    /* Listar utentes por médico */
    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const { medicoId } = req.params;
            const utentes = await this.service.listarPorMedico(Number(medicoId));
            res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar utentes por médico' });
        }
    }
}
