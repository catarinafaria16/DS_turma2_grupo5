/*
 * ============================================================
 * medicacao.controller.ts — Controller de medicamentos prescritos
 * ============================================================
 *
 * Gere os medicamentos associados a prescrições médicas.
 * Inclui validação de doses clinicamente razoáveis.
 *
 * Médicos e admins prescrevem medicamentos.
 * Utentes podem consultar os seus medicamentos.
 *
 * Ao criar um medicamento, este é automaticamente sincronizado
 * com a medicação habitual do utente.
 */
import type { Request, Response } from 'express';
import { MedicacaoService } from '../services/medicacao.service.js';
import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class MedicacaoController {
    private service = new MedicacaoService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicacaoData: CreateMedicacaoDto = req.body;
            const novaMedicacao = await this.service.criar(medicacaoData, utilizador);
            return res.status(201).json({ mensagem: 'Medicacao criada com sucesso', dados: novaMedicacao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar medicacao' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicacoes = await this.service.listar(utilizador);
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicacoes' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const medicacao = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: medicacao });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter medicacao' });
        }
    }

    async listarPorPrescricao(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { prescricaoId } = req.params;
            const medicacoes = await this.service.listarPorPrescricao(Number(prescricaoId), utilizador);
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicacoes por prescricao' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const medicacaoData: CreateMedicacaoDto = req.body;
            const medicacaoAtualizada = await this.service.atualizar(Number(id), medicacaoData, utilizador);
            return res.status(200).json({ mensagem: 'Medicacao atualizada com sucesso', dados: medicacaoAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar medicacao' });
        }
    }
}
