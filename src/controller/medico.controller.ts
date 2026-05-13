import type { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service.js';
import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto.js';

export class MedicoController {
    private service: MedicoService;

    constructor() {
        this.service = new MedicoService();
    }

    /* Criar novo médico */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const medicoData: CreateMedicoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const novoMedico = await this.service.criar(medicoData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Médico criado com sucesso',
                dados: novoMedico
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao criar médico' });
        }
    }

    /* Listar todos os médicos */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const medicos = await this.service.listar();
            res.status(200).json({
                dados: medicos,
                total: medicos.length
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar médicos' });
        }
    }

    /* Obter médico por ID */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medico = await this.service.obter(Number(id));
            res.status(200).json({ dados: medico });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao obter médico' });
        }
    }

    /* Atualizar médico */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicoData: CreateMedicoDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const medicoAtualizado = await this.service.atualizar(Number(id), medicoData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Médico atualizado com sucesso',
                dados: medicoAtualizado
            });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao atualizar médico' });
        }
    }

    /* Apagar médico */
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao apagar médico' });
        }
    }

    /* Listar médicos por especialidade */
    async listarPorEspecialidade(req: Request, res: Response): Promise<void> {
        try {
            const { especialidade } = req.params;
            const medicos = await this.service.listarPorEspecialidade(String(especialidade));
            res.status(200).json({ dados: medicos, total: medicos.length });
        } catch (error: any) {
            res.status(400).json({ erro: error.message || 'Erro ao listar médicos por especialidade' });
        }
    }
}
