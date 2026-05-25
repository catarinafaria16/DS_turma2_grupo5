import type { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service.js';
import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class MedicoController {
    private service = new MedicoService();

    async criar(req: Request, res: Response) {
        try {
            const medicoData: CreateMedicoDto = req.body;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const novoMedico = await this.service.criar(medicoData, utilizador);
            return res.status(201).json({ mensagem: 'Medico criado com sucesso', dados: novoMedico });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar medico' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicos = await this.service.listar(utilizador);
            return res.status(200).json({ dados: medicos, total: medicos.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicos' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medico = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: medico });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter medico' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const medicoData: Partial<CreateMedicoDto> = req.body;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicoAtualizado = await this.service.atualizar(Number(id), medicoData, utilizador);
            return res.status(200).json({ mensagem: 'Medico atualizado com sucesso', dados: medicoAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar medico' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            await this.service.apagar(Number(id), utilizador);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao apagar medico' });
        }
    }

    async listarPorEspecialidade(req: Request, res: Response) {
        try {
            const { especialidade } = req.params;
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const medicos = await this.service.listarPorEspecialidade(String(especialidade), utilizador);
            return res.status(200).json({ dados: medicos, total: medicos.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar medicos por especialidade' });
        }
    }
}
