/*
 * ============================================================
 * utilizador.controller.ts — Controller de utilizadores do sistema
 * ============================================================
 *
 * Gere as contas de acesso ao sistema (utilizadores).
 * Cada utilizador tem nome, email, password e perfil (ADMIN/MEDICO/UTENTE).
 *
 * Funcionalidades:
 *   - Criar utilizador (só admins podem criar pela API; registo público está em app.ts)
 *   - Listar todos os utilizadores (só admins)
 *   - Obter dados de um utilizador (admin vê todos; outros só veem a si próprios)
 *   - Atualizar (admin atualiza qualquer campo; outros só atualizam email/password)
 *   - Apagar (soft delete, só admins)
 */
import type { Request, Response } from 'express';
import { UtilizadorService } from '../services/utilizador.service.js';
import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class UtilizadorController {
    private service = new UtilizadorService();

    async criar(req: Request, res: Response) {
        try {
            const utilizadorData: CreateUtilizadorDto = req.body;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novoUtilizador = await this.service.criar(utilizadorData, utilizador.id);
            return res.status(201).json({ mensagem: 'Utilizador criado com sucesso', dados: novoUtilizador });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar utilizador' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const utilizadores = await this.service.listar();
            return res.status(200).json({ dados: utilizadores, total: utilizadores.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar utilizadores' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorLogado = req.utilizador as UtilizadorAutenticado;
            const utilizador = await this.service.obter(Number(id), utilizadorLogado);
            return res.status(200).json({ dados: utilizador });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter utilizador' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorData: Partial<CreateUtilizadorDto> = req.body;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const utilizadorAtualizado = await this.service.atualizar(Number(id), utilizadorData, utilizador);
            return res.status(200).json({ mensagem: 'Utilizador atualizado com sucesso', dados: utilizadorAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar utilizador' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            await this.service.apagar(Number(id), utilizador.id);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao apagar utilizador' });
        }
    }
}
