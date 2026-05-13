import { Request, Response } from 'express';
import { AlertaService } from '../services/alerta.service';
import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto';

export class AlertaController {
    private service: AlertaService;

    constructor() {
        this.service = new AlertaService();
    }

    /* Criar novo alerta */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const alertaData: CreateAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoAlerta = await this.service.criar(alertaData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Alerta criado com sucesso',
                dados: novoAlerta
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar alerta'
            });
        }
    }

    /* Listar todos os alertas */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const alertas = await this.service.listar();
            res.status(200).json({
                dados: alertas,
                total: alertas.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar alertas'
            });
        }
    }

    /* Obter alerta por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const alerta = await this.service.obter(Number(id));
            res.status(200).json({
                dados: alerta
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter alerta'
            });
        }
    }

    /* Listar alertas por utente */
    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const alertas = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({
                dados: alertas,
                total: alertas.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar alertas do utente'
            });
        }
    }

    /* Listar alertas por médico */
    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const { medicoId } = req.params;
            const alertas = await this.service.listarPorMedico(Number(medicoId));
            res.status(200).json({
                dados: alertas,
                total: alertas.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar alertas do médico'
            });
        }
    }

    /* Listar alertas por estado */
    async listarPorEstado(req: Request, res: Response): Promise<void> {
        try {
            const { estado } = req.params;
            const alertas = await this.service.listarPorEstado(estado);
            res.status(200).json({
                dados: alertas,
                total: alertas.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar alertas por estado'
            });
        }
    }

    /* Atualizar alerta */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const alertaData: Partial<CreateAlertaDto> = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const alertaAtualizado = await this.service.atualizar(Number(id), alertaData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Alerta atualizado com sucesso',
                dados: alertaAtualizado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar alerta'
            });
        }
    }

    /* Apagar alerta */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar alerta'
            });
        }
    }

    /* Marcar alerta como lido */
    async marcarComoLido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const alertaAtualizado = await this.service.marcarComoLido(Number(id), utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Alerta marcado como lido',
                dados: alertaAtualizado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao marcar alerta como lido'
            });
        }
    }

    /* Marcar alerta como resolvido */
    async marcarComoResolvido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const alertaAtualizado = await this.service.marcarComoResolvido(Number(id), utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Alerta marcado como resolvido',
                dados: alertaAtualizado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao marcar alerta como resolvido'
            });
        }
    }
}