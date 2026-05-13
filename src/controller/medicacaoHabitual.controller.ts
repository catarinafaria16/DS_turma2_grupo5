import type { Request, Response } from 'express';
import { MedicacaoHabitualService } from '../services/medicacaoHabitual.service.js';

export class MedicacaoHabitualController {
    private service: MedicacaoHabitualService;

    constructor() {
        this.service = new MedicacaoHabitualService();
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novaMedicacao = await this.service.criar(req.body, utilizadorIdLogado);
            res.status(201).json({ mensagem: 'Medicação habitual criada com sucesso', dados: novaMedicacao });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar medicação habitual' });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const medicacoes = await this.service.listar();
            res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar medicações habituais' });
        }
    }

    async listarPorAnamnese(req: Request, res: Response): Promise<void> {
        try {
            const { anamneseId } = req.params;
            const medicacoes = await this.service.listarPorAnamnese(Number(anamneseId));
            res.status(200).json({ dados: medicacoes, total: medicacoes.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar medicações habituais por anamnese' });
        }
    }

    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicacao = await this.service.obter(Number(id));
            res.status(200).json({ dados: medicacao });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter medicação habitual' });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const medicacaoAtualizada = await this.service.atualizar(Number(id), req.body, utilizadorIdLogado);
            res.status(200).json({ mensagem: 'Medicação habitual atualizada com sucesso', dados: medicacaoAtualizada });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar medicação habitual' });
        }
    }

    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar medicação habitual' });
        }
    }
}
