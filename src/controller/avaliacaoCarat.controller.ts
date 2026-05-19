import type { Request, Response } from 'express';
import { AvaliacaoCaratService } from '../services/avaliacaoCarat.service.js';
import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto.js';

export class AvaliacaoCaratController {
    private service = new AvaliacaoCaratService();

    async criar(req: Request, res: Response) {
        try {
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaAvaliacao = await this.service.criar(avaliacaoData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Avaliação CARAT criada com sucesso', dados: novaAvaliacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar avaliação CARAT' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const avaliacoes = await this.service.listar();
            return res.status(200).json({ dados: avaliacoes, total: avaliacoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar avaliações CARAT' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const avaliacao = await this.service.obter(Number(id));
            return res.status(200).json({ dados: avaliacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter avaliação CARAT' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const avaliacaoAtualizada = await this.service.atualizar(Number(id), avaliacaoData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Avaliação CARAT atualizada com sucesso', dados: avaliacaoAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar avaliação CARAT' });
        }
    }

}
