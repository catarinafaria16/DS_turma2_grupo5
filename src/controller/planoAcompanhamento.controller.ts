import type { Request, Response } from 'express';
import { PlanoAcompanhamentoService } from '../services/planoAcompanhamento.service.js';
import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';

export class PlanoAcompanhamentoController {
    private service = new PlanoAcompanhamentoService();

    async criar(req: Request, res: Response) {
        try {
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoPlano = await this.service.criar(planoData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Plano de acompanhamento criado com sucesso', dados: novoPlano });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar plano de acompanhamento' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const planos = await this.service.listar();
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos de acompanhamento' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const plano = await this.service.obter(Number(id));
            return res.status(200).json({ dados: plano });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter plano de acompanhamento' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const planos = await this.service.listarPorUtente(Number(utenteId));
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos por utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const { medicoId } = req.params;
            const planos = await this.service.listarPorMedico(Number(medicoId));
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos por médico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const planoAtualizado = await this.service.atualizar(Number(id), planoData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Plano de acompanhamento atualizado com sucesso', dados: planoAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar plano de acompanhamento' });
        }
    }

    async atualizarEstado(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { novoEstado } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const planoAtualizado = await this.service.atualizarEstado(Number(id), novoEstado as EstadoPlanoAcompanhamento, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Estado do plano atualizado com sucesso', dados: planoAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar estado do plano de acompanhamento' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar plano de acompanhamento' });
        }
    }
}
