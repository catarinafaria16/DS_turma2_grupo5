/*
 * ============================================================
 * planoAcompanhamento.controller.ts — Controller de planos de acompanhamento
 * ============================================================
 *
 * Gere os planos de acompanhamento clínico definidos pelo médico.
 * Um plano define a frequência das consultas, a duração e as recomendações clínicas.
 *
 * Funcionalidade especial: atualizarEstado permite mudar o estado do plano
 * (ATIVO → CONCLUIDO ou SUSPENSO) sem ter de reenviar todos os dados.
 *
 * Médicos e admins criam e gerem planos.
 * Utentes podem consultar os seus planos.
 */
import type { Request, Response } from 'express';
import { PlanoAcompanhamentoService } from '../services/planoAcompanhamento.service.js';
import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class PlanoAcompanhamentoController {
    private service = new PlanoAcompanhamentoService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const novoPlano = await this.service.criar(planoData, utilizador);
            return res.status(201).json({ mensagem: 'Plano de acompanhamento criado com sucesso', dados: novoPlano });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar plano de acompanhamento' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const planos = await this.service.listar(utilizador);
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos de acompanhamento' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const plano = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: plano });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter plano de acompanhamento' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const planos = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos por utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const planos = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: planos, total: planos.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar planos por medico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const planoData: CreatePlanoAcompanhamentoDto = req.body;
            const planoAtualizado = await this.service.atualizar(Number(id), planoData, utilizador);
            return res.status(200).json({ mensagem: 'Plano de acompanhamento atualizado com sucesso', dados: planoAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar plano de acompanhamento' });
        }
    }

    async atualizarEstado(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const { novoEstado } = req.body;
            const planoAtualizado = await this.service.atualizarEstado(
                Number(id),
                novoEstado as EstadoPlanoAcompanhamento,
                utilizador
            );
            return res.status(200).json({ mensagem: 'Estado do plano atualizado com sucesso', dados: planoAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar estado do plano de acompanhamento' });
        }
    }
}
