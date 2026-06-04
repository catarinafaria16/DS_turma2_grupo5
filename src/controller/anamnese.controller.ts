/*
 * ============================================================
 * anamnese.controller.ts — Controller da história clínica (anamnese)
 * ============================================================
 *
 * Gere a anamnese dos utentes — o registo da sua história clínica de fundo.
 * Contém historial familiar, situação tabágica e sexo biológico.
 *
 * Apenas médicos e administradores têm acesso.
 * A anamnese é o "pai" de alergias, comorbilidades e medicação habitual.
 */
import type { Request, Response } from 'express';
import { AnamneseService } from '../services/anamnese.service.js';
import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class AnamneseController {
    private service = new AnamneseService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const anamneseData: CreateAnamneseDto = req.body;
            const novaAnamnese = await this.service.criar(anamneseData, utilizador);
            return res.status(201).json({ mensagem: 'Anamnese criada com sucesso', dados: novaAnamnese });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao criar anamnese' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const anamneses = await this.service.listar(utilizador);
            return res.status(200).json({ dados: anamneses, total: anamneses.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar anamneses' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const anamnese = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: anamnese });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter anamnese' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const anamneses = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: anamneses, total: anamneses.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar anamneses do utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const anamneseData: CreateAnamneseDto = req.body;
            const anamneseAtualizada = await this.service.atualizar(Number(id), anamneseData, utilizador);
            return res.status(200).json({ mensagem: 'Anamnese atualizada com sucesso', dados: anamneseAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar anamnese' });
        }
    }
}
