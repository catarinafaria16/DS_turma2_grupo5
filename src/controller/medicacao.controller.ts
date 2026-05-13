import type { Request, Response } from 'express';
import { MedicacaoService } from '../services/medicacao.service.js';
import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto.js';

export class MedicacaoController {
    private service: MedicacaoService;

    constructor() {
        this.service = new MedicacaoService();
    }

    /* Criar nova medicação */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const medicacaoData: CreateMedicacaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novaMedicacao = await this.service.criar(medicacaoData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Medicação criada com sucesso',
                dados: novaMedicacao
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar medicação'
            });
        }
    }

    /* Listar todas as medicações */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const medicacoes = await this.service.listar();
            res.status(200).json({
                dados: medicacoes,
                total: medicacoes.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar medicações'
            });
        }
    }

    /* Obter medicação por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicacao = await this.service.obter(Number(id));
            res.status(200).json({
                dados: medicacao
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter medicação'
            });
        }
    }

    /* Listar medicações por prescrição */
    async listarPorPrescricao(req: Request, res: Response): Promise<void> {
        try {
            const { prescricaoId } = req.params;
            const medicacoes = await this.service.listarPorPrescricao(Number(prescricaoId));
            res.status(200).json({
                dados: medicacoes,
                total: medicacoes.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar medicações por prescrição'
            });
        }
    }

    /* Atualizar medicação */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicacaoData: CreateMedicacaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const medicacaoAtualizada = await this.service.atualizar(Number(id), medicacaoData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Medicação atualizada com sucesso',
                dados: medicacaoAtualizada
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar medicação'
            });
        }
    }

    /* Apagar medicação */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar medicação'
            });
        }
    }
}