/*
 * ============================================================
 * alerta.controller.ts — Controller de alertas clínicos
 * ============================================================
 *
 * Este controller gere os alertas clínicos gerados automaticamente
 * (quando um score CARAT é preocupante) ou manualmente pelo médico.
 *
 * Funcionalidades:
 *   - Criar alertas manualmente
 *   - Listar e filtrar alertas (por utente, médico, estado)
 *   - Marcar alertas como "visto" (VISTO) ou "resolvido" (FECHADO)
 *   - Adicionar notas clínicas a um alerta
 *   - Obter resumo estatístico dos alertas
 *
 * O ciclo de vida de um alerta:
 *   NOVO → VISTO → FECHADO (resolvido)
 */
import type { Request, Response } from 'express';
import { AlertaService } from '../services/alerta.service.js';
import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class AlertaController {
    private service = new AlertaService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const alertaData: CreateAlertaDto = req.body;
            const novoAlerta = await this.service.criar(alertaData, utilizador);
            return res.status(201).json({ mensagem: 'Alerta criado com sucesso', dados: novoAlerta });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao criar alerta' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const alertas = await this.service.listar(utilizador);
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const alerta = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: alerta });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter alerta' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const alertas = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas do utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const alertas = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas do medico' });
        }
    }

    async listarPorEstado(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const alertas = await this.service.listar(utilizador);
            const { estado } = req.params;
            const filtrados = alertas.filter((a: any) => a.estado === estado);
            return res.status(200).json({ dados: filtrados, total: filtrados.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas por estado' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const { estado } = req.body;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), estado, utilizador);
            return res.status(200).json({ mensagem: 'Alerta atualizado com sucesso', dados: alertaAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar alerta' });
        }
    }

    async marcarComoLido(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), EstadoAlerta.VISTO, utilizador);
            return res.status(200).json({ mensagem: 'Alerta marcado como lido', dados: alertaAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao marcar alerta como lido' });
        }
    }

    async marcarComoResolvido(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), EstadoAlerta.FECHADO, utilizador);
            return res.status(200).json({ mensagem: 'Alerta marcado como resolvido', dados: alertaAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao marcar alerta como resolvido' });
        }
    }

    async adicionarNota(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const { nota } = req.body;
            const alertaAtualizado = await this.service.adicionarNota(Number(id), nota, utilizador);
            return res.status(200).json({ mensagem: 'Nota adicionada ao alerta', dados: alertaAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao adicionar nota ao alerta' });
        }
    }

    async resumo(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const dados = await this.service.obterResumo(utilizador);
            return res.status(200).json({ dados });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter resumo de alertas' });
        }
    }
}
