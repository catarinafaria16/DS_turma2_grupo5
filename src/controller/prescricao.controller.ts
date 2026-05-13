import { Request, Response } from 'express';
import { PrescricaoService } from '../services/prescricao.service';
import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto';

export class PrescricaoController {
    private service: PrescricaoService;

    constructor() {
        this.service = new PrescricaoService();
    }

    /* Criar nova prescrição */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const prescricaoData: CreatePrescricaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaPrescricao = await this.service.criar(prescricaoData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Prescrição criada com sucesso',
                dados: novaPrescricao
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar prescrição' });
        }
    }

    /* Listar todas as prescrições */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const prescricoes = await this.service.listar();
            res.status(200).json({
                dados: prescricoes,
                total: prescricoes.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar prescrições' });
        }
    }

    /* Obter prescrição por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const prescricao = await this.service.obter(Number(id));
            res.status(200).json({ dados: prescricao });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter prescrição' });
        }
    }

    /* Listar prescrições por utente */
    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const { utenteId } = req.params;
            const prescricoes = await this.service.listarPorUtente(Number(utenteId));
            res.status(200).json({
                dados: prescricoes,
                total: prescricoes.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar prescrições por utente' });
        }
    }

    /* Listar prescrições por médico */
    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const { medicoId } = req.params;
            const prescricoes = await this.service.listarPorMedico(Number(medicoId));
            res.status(200).json({
                dados: prescricoes,
                total: prescricoes.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar prescrições por médico' });
        }
    }

    /* Atualizar prescrição */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const prescricaoData: CreatePrescricaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const prescricaoAtualizada = await this.service.atualizar(Number(id), prescricaoData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Prescrição atualizada com sucesso',
                dados: prescricaoAtualizada
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar prescrição' });
        }
    }

    /* Apagar prescrição */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar prescrição' });
        }
    }
}
