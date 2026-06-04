/*
 * ============================================================
 * utente.controller.ts — Controller de utentes (pacientes)
 * ============================================================
 *
 * Este controller recebe os pedidos HTTP relacionados com utentes e
 * delega o processamento ao UtenteService.
 *
 * Pensa nisto como um "rececionista": recebe o pedido, verifica os
 * parâmetros básicos, chama o serviço especializado e devolve a resposta.
 *
 * Padrão de códigos de resposta HTTP usados:
 *   201 Created   — registo criado com sucesso
 *   200 OK        — consulta ou atualização bem-sucedida
 *   204 No Content — eliminação bem-sucedida (sem dados para devolver)
 *   400 Bad Request — dados inválidos ou erro de negócio
 *   403 Forbidden  — utilizador sem permissão para esta operação
 */
import type { Request, Response } from 'express';
import { UtenteService } from '../services/utente.service.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class UtenteController {
    // Instância do service que contém a lógica de negócio
    private service = new UtenteService();

    // POST /api/utentes — Criar um novo utente
    async criar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const utenteData: CreateUtenteDto = req.body;
            const novoUtente = await this.service.criar(utenteData, utilizador);
            return res.status(201).json({ mensagem: 'Utente criado com sucesso', dados: novoUtente });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao criar utente' });
        }
    }

    // GET /api/utentes — Listar utentes (filtrado pelo perfil do utilizador autenticado)
    async listar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const utentes = await this.service.listar(utilizador);
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes' });
        }
    }

    // GET /api/utentes/:id — Obter dados de um utente específico pelo ID
    async obter(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            // O id vem da URL (ex: /api/utentes/5 → id = "5")
            const { id } = req.params;
            const utente = await this.service.obter(Number(id), utilizador);
            return res.status(200).json({ dados: utente });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter utente' });
        }
    }

    // PUT /api/utentes/:id — Atualizar dados de um utente
    async atualizar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const utenteData: Partial<CreateUtenteDto> = req.body;
            const utenteAtualizado = await this.service.atualizar(Number(id), utenteData, utilizador);
            return res.status(200).json({ mensagem: 'Utente atualizado com sucesso', dados: utenteAtualizado });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar utente' });
        }
    }

    // DELETE /api/utentes/:id — Apagar logicamente um utente (soft delete)
    async apagar(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            await this.service.apagar(Number(id), utilizador);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao apagar utente' });
        }
    }

    // GET /api/utentes/:id/historico-clinico — Obter o histórico clínico completo do utente
    async historicoClinico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { id } = req.params;
            const historico = await this.service.historicoClinico(Number(id), utilizador);
            return res.status(200).json({ dados: historico });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao obter historico clinico' });
        }
    }

    // GET /api/utentes/medico/:medicoId — Listar todos os utentes de um médico específico
    async listarPorMedico(req: Request, res: Response) {
        try {
            const utilizador = req.utilizador as UtilizadorAutenticado;
            const { medicoId } = req.params;
            const utentes = await this.service.listarPorMedico(Number(medicoId), utilizador);
            return res.status(200).json({ dados: utentes, total: utentes.length });
        } catch (error: any) {
            if (error.message.includes('Acesso negado')) {
                return res.status(403).json({ erro: error.message });
            }
            return res.status(400).json({ erro: error.message || 'Erro ao listar utentes por medico' });
        }
    }
}
