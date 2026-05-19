import type { Request, Response } from 'express';
import { RespostaCaratService } from '../services/respostaCarat.service.js';
import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';

export class RespostaCaratController {
    private service = new RespostaCaratService();

    async criar(req: Request, res: Response) {
        try {
            const respostaData: CreateRespostaCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaResposta = await this.service.criar(respostaData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Resposta CARAT criada com sucesso', dados: novaResposta });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar resposta CARAT' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const respostas = await this.service.listar();
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas CARAT' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resposta = await this.service.obter(Number(id));
            return res.status(200).json({ dados: resposta });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter resposta CARAT' });
        }
    }

    async listarPorAvaliacao(req: Request, res: Response) {
        try {
            const { avaliacaoId } = req.params;
            const respostas = await this.service.listarPorAvaliacao(Number(avaliacaoId));
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas por avaliação' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const respostas = await this.service.listarPorUtente(Number(utenteId));
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas por utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const respostaData: CreateRespostaCaratDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const respostaAtualizada = await this.service.atualizar(Number(id), respostaData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Resposta CARAT atualizada com sucesso', dados: respostaAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar resposta CARAT' });
        }
    }

}
