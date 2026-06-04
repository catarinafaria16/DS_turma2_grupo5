/*
 * ============================================================
 * prescricao.controller.ts — Controller de prescrições médicas
 * ============================================================
 *
 * Este controller gere as prescrições médicas — documentos emitidos pelo médico
 * que autorizam medicamentos ou exames.
 *
 * Funcionalidades:
 *   - Criar prescrição (só médicos e admins)
 *   - Listar prescrições (utentes veem as suas, médicos veem as suas, admins veem todas)
 *   - Obter prescrição específica
 *   - Listar prescrições por utente ou por médico
 *   - Atualizar prescrição (só médicos e admins)
 */
import type { Request, Response } from 'express';
import { PrescricaoService } from '../services/prescricao.service.js';
import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class PrescricaoController {
    private service = new PrescricaoService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const prescricaoData: CreatePrescricaoDto = req.body;
            const novaPrescricao = await this.service.criar(prescricaoData, utilizador);
            return res.status(201).json({ mensagem: 'Prescricao criada com sucesso', dados: novaPrescricao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao criar prescricao' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const prescricoes = await this.service.listar(utilizador);
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescricoes' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const prescricao = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: prescricao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter prescricao' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const prescricoes = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescricoes por utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const prescricoes = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: prescricoes, total: prescricoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar prescricoes por medico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const prescricaoData: CreatePrescricaoDto = req.body;
            const prescricaoAtualizada = await this.service.atualizar(Number(id), prescricaoData, utilizador);
            return res.status(200).json({ mensagem: 'Prescricao atualizada com sucesso', dados: prescricaoAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar prescricao' });
        }
    }
}
