import type { Request, Response } from 'express';
import { PrescricaoService } from '../services/prescricao.service.js';
import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto.js';

export class PrescricaoController {
    private service = new PrescricaoService();

    async criar(req: Request, res: Response) {
        try {
            const prescricaoData: CreatePrescricaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaPrescricao = await this.service.criar(prescricaoData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Prescrição criada com sucesso', dados: novaPrescricao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar prescrição' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const prescricoes = await this.service.listar();
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescrições' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const prescricao = await this.service.obter(Number(id));
            return res.status(200).json({ dados: prescricao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter prescrição' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const prescricoes = await this.service.listarPorUtente(Number(utenteId));
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescrições por utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const { medicoId } = req.params;
            const prescricoes = await this.service.listarPorMedico(Number(medicoId));
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescrições por médico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const prescricaoData: CreatePrescricaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const prescricaoAtualizada = await this.service.atualizar(Number(id), prescricaoData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Prescrição atualizada com sucesso', dados: prescricaoAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar prescrição' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar prescrição' });
        }
    }
}
