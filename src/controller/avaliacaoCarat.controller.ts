import type { Request, Response } from 'express';
import { AvaliacaoCaratService } from '../services/avaliacaoCarat.service.js';
import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto.js';

export class AvaliacaoCaratController {
    private service: AvaliacaoCaratService;

    constructor() {
        this.service = new AvaliacaoCaratService();
    }

    /* Criar nova avaliação CARAT */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaAvaliacao = await this.service.criar(avaliacaoData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Avaliação CARAT criada com sucesso',
                dados: novaAvaliacao
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar avaliação CARAT'
            });
        }
    }

    /* Listar todas as avaliações CARAT */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const avaliacoes = await this.service.listar();
            res.status(200).json({
                dados: avaliacoes,
                total: avaliacoes.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar avaliações CARAT'
            });
        }
    }

    /* Obter avaliação CARAT por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const avaliacao = await this.service.obter(Number(id));
            res.status(200).json({
                dados: avaliacao
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter avaliação CARAT'
            });
        }
    }

    /* Atualizar avaliação CARAT */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const avaliacaoData: CreateAvaliacaoCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const avaliacaoAtualizada = await this.service.atualizar(Number(id), avaliacaoData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Avaliação CARAT atualizada com sucesso',
                dados: avaliacaoAtualizada
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar avaliação CARAT'
            });
        }
    }

    /* Apagar avaliação CARAT */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar avaliação CARAT'
            });
        }
    }
}