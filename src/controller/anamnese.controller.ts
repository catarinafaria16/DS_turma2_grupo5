import type { Request, Response } from 'express';
import { AnamneseService } from '../services/anamnese.service.js';
import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';

export class AnamneseController {
    private service: AnamneseService;

    constructor() {
        this.service = new AnamneseService();
    }

    /* Criar nova anamnese */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const anamneseData: CreateAnamneseDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaAnamnese = await this.service.criar(anamneseData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Anamnese criada com sucesso',
                dados: novaAnamnese
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar anamnese'
            });
        }
    }

    /* Listar todas as anamneses */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const anamneses = await this.service.listar();
            res.status(200).json({
                dados: anamneses,
                total: anamneses.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar anamneses'
            });
        }
    }

    /* Obter anamnese por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const anamnese = await this.service.obter(Number(id));
            res.status(200).json({
                dados: anamnese
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter anamnese'
            });
        }
    }

    /* Listar anamneses por utente */
    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const anamneses = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({
                dados: anamneses,
                total: anamneses.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar anamneses do utente'
            });
        }
    }

    /* Atualizar anamnese */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const anamneseData: CreateAnamneseDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const anamneseAtualizada = await this.service.atualizar(Number(id), anamneseData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Anamnese atualizada com sucesso',
                dados: anamneseAtualizada
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar anamnese'
            });
        }
    }

    /* Apagar anamnese */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar anamnese'
            });
        }
    }
}