/*
 * ============================================================
 * sintoma.controller.ts — Controller de sintomas clínicos
 * ============================================================
 *
 * Gere o registo e consulta de sintomas reportados pelos utentes.
 * Utentes podem registar os seus próprios sintomas.
 * Médicos podem ver sintomas dos seus utentes.
 * Administradores têm acesso a todos os sintomas.
 */
import type { Request, Response } from 'express';
import { SintomaService } from '../services/sintoma.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class SintomaController {
    private service = new SintomaService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novoSintoma = await this.service.criar(req.body, utilizador);
            return res.status(201).json({ mensagem: 'Sintoma criado com sucesso', dados: novoSintoma });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao criar sintoma' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const sintomas = await this.service.listar(utilizador);
            return res.status(200).json({ dados: sintomas, total: sintomas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar sintomas' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const sintomas = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: sintomas, total: sintomas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar sintomas do utente' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const sintoma = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: sintoma });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter sintoma' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const sintomaAtualizado = await this.service.atualizar(Number(id), req.body, utilizador);
            return res.status(200).json({ mensagem: 'Sintoma atualizado com sucesso', dados: sintomaAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar sintoma' });
        }
    }
}
