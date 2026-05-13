import type { Request, Response } from 'express';
import { RespostaCaratService } from '../services/respostaCarat.service.js';
import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';

export class RespostaCaratController {
    private service: RespostaCaratService;

    constructor() {
        this.service = new RespostaCaratService();
    }

    /* Criar nova resposta CARAT */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const respostaData: CreateRespostaCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaResposta = await this.service.criar(respostaData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Resposta CARAT criada com sucesso',
                dados: novaResposta
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar resposta CARAT' });
        }
    }

    /* Listar todas as respostas CARAT */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const respostas = await this.service.listar();
            res.status(200).json({
                dados: respostas,
                total: respostas.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar respostas CARAT' });
        }
    }

    /* Obter resposta CARAT por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const resposta = await this.service.obter(Number(id));
            res.status(200).json({ dados: resposta });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter resposta CARAT' });
        }
    }

    /* Listar respostas por avaliação */
    async listarPorAvaliacao(req: Request, res: Response): Promise<void> {
        try {
            const { avaliacaoId } = req.params;
            const respostas = await this.service.listarPorAvaliacao(Number(avaliacaoId));
            res.status(200).json({
                dados: respostas,
                total: respostas.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar respostas por avaliação' });
        }
    }

    /* Listar respostas por utente */
    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const respostas = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({
                dados: respostas,
                total: respostas.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar respostas por utente' });
        }
    }

    /* Atualizar resposta CARAT */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const respostaData: CreateRespostaCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const respostaAtualizada = await this.service.atualizar(Number(id), respostaData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Resposta CARAT atualizada com sucesso',
                dados: respostaAtualizada
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar resposta CARAT' });
        }
    }

    /* Apagar resposta CARAT */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar resposta CARAT' });
        }
    }
}
