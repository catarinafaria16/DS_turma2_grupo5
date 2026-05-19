import type { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service.js';
import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto.js';

export class MedicoController {
    private service = new MedicoService();

    async criar(req: Request, res: Response) {
        try {
            const medicoData: CreateMedicoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoMedico = await this.service.criar(medicoData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Médico criado com sucesso', dados: novoMedico });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar médico' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const medicos = await this.service.listar();
            return res.status(200).json({ dados: medicos, total: medicos.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar médicos' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const medico = await this.service.obter(Number(id));
            return res.status(200).json({ dados: medico });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter médico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const medicoData: CreateMedicoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const medicoAtualizado = await this.service.atualizar(Number(id), medicoData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Médico atualizado com sucesso', dados: medicoAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar médico' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar médico' });
        }
    }

    async listarPorEspecialidade(req: Request, res: Response) {
        try {
            const { especialidade } = req.params;
            const medicos = await this.service.listarPorEspecialidade(String(especialidade));
            return res.status(200).json({ dados: medicos, total: medicos.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar médicos por especialidade' });
        }
    }
}
