import type { Request, Response } from 'express';
import { RegraAlertaService } from '../services/regraAlerta.service.js';
import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto.js';

export class RegraAlertaController {
    private service = new RegraAlertaService();

    async criar(req: Request, res: Response) {
        try {
            const regraData: CreateRegraAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaRegra = await this.service.criar(regraData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Regra de alerta criada com sucesso', dados: novaRegra });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar regra de alerta' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const regras = await this.service.listar();
            return res.status(200).json({ dados: regras, total: regras.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar regras de alerta' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const regra = await this.service.obter(Number(id));
            return res.status(200).json({ dados: regra });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter regra de alerta' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const { medicoId } = req.params;
            const regras = await this.service.listarPorMedico(Number(medicoId));
            return res.status(200).json({ dados: regras, total: regras.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar regras por médico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const regraData: CreateRegraAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const regraAtualizada = await this.service.atualizar(Number(id), regraData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Regra de alerta atualizada com sucesso', dados: regraAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar regra de alerta' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar regra de alerta' });
        }
    }
}
