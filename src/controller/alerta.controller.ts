import type { Request, Response } from 'express';
import { AlertaService } from '../services/alerta.service.js';
import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';

export class AlertaController {
    private service = new AlertaService();

    async criar(req: Request, res: Response) {
        try {
            const alertaData: CreateAlertaDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoAlerta = await this.service.criar(alertaData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Alerta criado com sucesso', dados: novoAlerta });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar alerta' });
        }
    }

    async listar(_req: Request, res: Response) {
        try {
            const alertas = await this.service.listar();
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const alerta = await this.service.obter(Number(id));
            return res.status(200).json({ dados: alerta });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter alerta' });
        }
    }

    async listarPorUtente(req: Request, res: Response) {
        try {
            const { utenteId } = req.params;
            const alertas = await this.service.listarPorUtente(Number(utenteId));
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas do utente' });
        }
    }

    async listarPorMedico(req: Request, res: Response) {
        try {
            const { medicoId } = req.params;
            const alertas = await this.service.listarPorMedico(Number(medicoId));
            return res.status(200).json({ dados: alertas, total: alertas.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas do médico' });
        }
    }

    async listarPorEstado(req: Request, res: Response) {
        try {
            const alertas = await this.service.listar();
            const { estado } = req.params;
            const filtrados = alertas.filter((a: any) => a.estado === estado);
            return res.status(200).json({ dados: filtrados, total: filtrados.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar alertas por estado' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estado, utilizadorIdLogado } = req.body;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), estado, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Alerta atualizado com sucesso', dados: alertaAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar alerta' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar alerta' });
        }
    }

    async marcarComoLido(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), EstadoAlerta.VISTO, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Alerta marcado como lido', dados: alertaAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao marcar alerta como lido' });
        }
    }

    async marcarComoResolvido(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const alertaAtualizado = await this.service.atualizarEstado(Number(id), EstadoAlerta.FECHADO, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Alerta marcado como resolvido', dados: alertaAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao marcar alerta como resolvido' });
        }
    }

    async adicionarNota(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nota, utilizadorIdLogado } = req.body;
            const alertaAtualizado = await this.service.adicionarNota(Number(id), nota, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Nota adicionada ao alerta', dados: alertaAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao adicionar nota ao alerta' });
        }
    }

    async resumo(_req: Request, res: Response) {
        try {
            const dados = await this.service.obterResumo();
            return res.status(200).json({ dados });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter resumo de alertas' });
        }
    }
}
