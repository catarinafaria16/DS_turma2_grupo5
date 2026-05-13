import type { Request, Response } from 'express';
import { RegraAlertaService } from '../services/regraAlerta.service.js';
import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto.js';

export class RegraAlertaController {
    private service: RegraAlertaService;

    constructor() {
        this.service = new RegraAlertaService();
    }

    /* Criar nova regra de alerta */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const regraData: CreateRegraAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaRegra = await this.service.criar(regraData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Regra de alerta criada com sucesso',
                dados: novaRegra
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar regra de alerta'
            });
        }
    }

    /* Listar todas as regras de alerta */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const regras = await this.service.listar();
            res.status(200).json({
                dados: regras,
                total: regras.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar regras de alerta'
            });
        }
    }

    /* Obter regra de alerta por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const regra = await this.service.obter(Number(id));
            res.status(200).json({
                dados: regra
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter regra de alerta'
            });
        }
    }

    /* Listar regras de alerta por médico */
    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const { medicoId } = req.params;
            const regras = await this.service.listarPorMedico(Number(medicoId));
            res.status(200).json({
                dados: regras,
                total: regras.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar regras por médico'
            });
        }
    }

    /* Atualizar regra de alerta */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const regraData: CreateRegraAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const regraAtualizada = await this.service.atualizar(Number(id), regraData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Regra de alerta atualizada com sucesso',
                dados: regraAtualizada
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar regra de alerta'
            });
        }
    }

    /* Apagar regra de alerta */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar regra de alerta'
            });
        }
    }
}