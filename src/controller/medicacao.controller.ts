import type { Request, Response } from 'express';
import { MedicacaoService } from '../services/medicacao.service.js';
import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto.js';

export class MedicacaoController {
    private service = new MedicacaoService();

    async criar(req: Request, res: Response) {
        try {
            const medicacaoData: CreateMedicacaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaMedicacao = await this.service.criar(medicacaoData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Medicação criada com sucesso', dados: novaMedicacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar medicação' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const medicacoes = await this.service.listar();
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicações' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const medicacao = await this.service.obter(Number(id));
            return res.status(200).json({ dados: medicacao });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter medicação' });
        }
    }

    async listarPorPrescricao(req: Request, res: Response) {
        try {
            const { prescricaoId } = req.params;
            const medicacoes = await this.service.listarPorPrescricao(Number(prescricaoId));
            return res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicações por prescrição' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const medicacaoData: CreateMedicacaoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const medicacaoAtualizada = await this.service.atualizar(Number(id), medicacaoData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Medicação atualizada com sucesso', dados: medicacaoAtualizada });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar medicação' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar medicação' });
        }
    }
}
