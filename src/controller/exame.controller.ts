import { Request, Response } from 'express';
import { ExameService } from '../services/exame.service';
import type { CreateExameDto } from '../dtos/exame/create-exame.dto';

export class ExameController {
    private service: ExameService;

    constructor() {
        this.service = new ExameService();
    }

    /* Criar novo exame */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const exameData: CreateExameDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoExame = await this.service.criar(exameData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Exame criado com sucesso',
                dados: novoExame
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar exame'
            });
        }
    }

    /* Listar todos os exames */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const exames = await this.service.listar();
            res.status(200).json({
                dados: exames,
                total: exames.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar exames'
            });
        }
    }

    /* Obter exame por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const exame = await this.service.obter(Number(id));
            res.status(200).json({
                dados: exame
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter exame'
            });
        }
    }

    /* Listar exames por prescrição */
    async listarPorPrescricao(req: Request, res: Response): Promise<void> {
        try {
            const { prescricaoId } = req.params;
            const exames = await this.service.listarPorPrescricao(Number(prescricaoId));
            res.status(200).json({
                dados: exames,
                total: exames.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar exames por prescrição'
            });
        }
    }

    /* Atualizar exame */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const exameData: CreateExameDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const exameAtualizado = await this.service.atualizar(Number(id), exameData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Exame atualizado com sucesso',
                dados: exameAtualizado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar exame'
            });
        }
    }

    /* Apagar exame */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar exame'
            });
        }
    }
}