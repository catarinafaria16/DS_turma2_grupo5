import { Request, Response } from 'express';
import { UtilizadorService } from '../services/utilizador.service';
import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto';

export class UtilizadorController {
    private service: UtilizadorService;

    constructor() {
        this.service = new UtilizadorService();
    }

    /* Criar novo utilizador */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utilizadorData: CreateUtilizadorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoUtilizador = await this.service.criar(utilizadorData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Utilizador criado com sucesso',
                dados: novoUtilizador
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar utilizador' });
        }
    }

    /* Listar todos os utilizadores */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utilizadores = await this.service.listar();
            res.status(200).json({
                dados: utilizadores,
                total: utilizadores.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar utilizadores' });
        }
    }

    /* Obter utilizador por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizador = await this.service.obter(Number(id));
            res.status(200).json({ dados: utilizador });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter utilizador' });
        }
    }

    /* Atualizar utilizador */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorData: CreateUtilizadorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const utilizadorAtualizado = await this.service.atualizar(Number(id), utilizadorData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Utilizador atualizado com sucesso',
                dados: utilizadorAtualizado
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar utilizador' });
        }
    }

    /* Apagar utilizador */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar utilizador' });
        }
    }
}
