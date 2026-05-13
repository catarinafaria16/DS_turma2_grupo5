import { Request, Response } from 'express';
import { PlanoAcompanhamentoService } from '../services/planoAcompanhamento.service';
import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum';

export class PlanoAcompanhamentoController {
    private service: PlanoAcompanhamentoService;

    constructor() {
        this.service = new PlanoAcompanhamentoService();
    }

    /* Criar novo plano de acompanhamento */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoPlano = await this.service.criar(planoData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Plano de acompanhamento criado com sucesso',
                dados: novoPlano
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar plano de acompanhamento' });
        }
    }

    /* Listar todos os planos de acompanhamento */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const planos = await this.service.listar();
            res.status(200).json({
                dados: planos,
                total: planos.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar planos de acompanhamento' });
        }
    }

    /* Obter plano de acompanhamento por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const plano = await this.service.obter(Number(id));
            res.status(200).json({ dados: plano });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter plano de acompanhamento' });
        }
    }

    /* Listar planos por utente */
    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const planos = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({
                dados: planos,
                total: planos.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar planos por utente' });
        }
    }

    /* Listar planos por médico */
    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const { medicoId } = req.params;
            const planos = await this.service.listarPorMedico(Number(medicoId));
            res.status(200).json({
                dados: planos,
                total: planos.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar planos por médico' });
        }
    }

    /* Atualizar plano de acompanhamento */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const planoAtualizado = await this.service.atualizar(Number(id), planoData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Plano de acompanhamento atualizado com sucesso',
                dados: planoAtualizado
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar plano de acompanhamento' });
        }
    }

    /* Atualizar estado do plano de acompanhamento */
    async atualizarEstado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { novoEstado } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const planoAtualizado = await this.service.atualizarEstado(
                Number(id),
                novoEstado as EstadoPlanoAcompanhamento,
                utilizadorIdLogado
            );
            res.status(200).json({
                mensagem: 'Estado do plano atualizado com sucesso',
                dados: planoAtualizado
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar estado do plano de acompanhamento' });
        }
    }

    /* Apagar plano de acompanhamento */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar plano de acompanhamento' });
        }
    }
}
