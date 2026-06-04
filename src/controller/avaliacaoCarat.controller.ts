/*
 * ============================================================
 * avaliacaoCarat.controller.ts — Controller do modelo do questionário CARAT
 * ============================================================
 *
 * Gere os modelos (templates) do questionário CARAT.
 * Normalmente existe apenas a versão 1, criada automaticamente quando o servidor arranca.
 *
 * Distinção importante:
 *   - AvaliacaoController: gere as PERGUNTAS do questionário (o formulário em branco)
 *   - RespostaCaratController: gere as RESPOSTAS dos utentes ao questionário
 */
import type { Request, Response } from 'express';
import { AvaliacaoCaratService } from '../services/avaliacaoCarat.service.js';
import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class AvaliacaoCaratController {
    private service = new AvaliacaoCaratService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const novaAvaliacao = await this.service.criar(avaliacaoData, utilizador);
            return res.status(201).json({ mensagem: 'Avaliacao CARAT criada com sucesso', dados: novaAvaliacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar avaliacao CARAT' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const avaliacoes = await this.service.listar();
            return res.status(200).json({ dados: avaliacoes, total: avaliacoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar avaliacoes CARAT' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const avaliacao = await this.service.obter(Number(id));
            return res.status(200).json({ dados: avaliacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter avaliacao CARAT' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const avaliacaoAtualizada = await this.service.atualizar(Number(id), avaliacaoData, utilizador);
            return res.status(200).json({ mensagem: 'Avaliacao CARAT atualizada com sucesso', dados: avaliacaoAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar avaliacao CARAT' });
        }
    }
}
