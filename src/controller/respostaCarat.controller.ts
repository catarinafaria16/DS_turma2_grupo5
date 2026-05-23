import type { Request, Response } from 'express';
import { RespostaCaratService } from '../services/respostaCarat.service.js';
import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class RespostaCaratController {
    private service = new RespostaCaratService();

    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const respostaData: CreateRespostaCaratDto = req.body;
            const novaResposta = await this.service.criar(respostaData, utilizador);
            return res.status(201).json({ mensagem: 'Resposta CARAT criada com sucesso', dados: novaResposta });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao criar resposta CARAT' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const respostas = await this.service.listar(utilizador);
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas CARAT' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const resposta = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: resposta });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao obter resposta CARAT' });
        }
    }

    async listarPorAvaliacao(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { avaliacaoId } = req.params;
            const respostas = await this.service.listarPorAvaliacao(Number(avaliacaoId), utilizador);
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas por avaliacao' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { utenteId } = req.params;
            const respostas = await this.service.listarPorUtente(Number(utenteId), utilizador);
            return res.status(200).json({ dados: respostas, total: respostas.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao listar respostas por utente' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const respostaData: CreateRespostaCaratDto = req.body;
            const respostaAtualizada = await this.service.atualizar(Number(id), respostaData, utilizador);
            return res.status(200).json({ mensagem: 'Resposta CARAT atualizada com sucesso', dados: respostaAtualizada });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) return res.status(403).json({ erro: error.message });
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar resposta CARAT' });
        }
    }
}
