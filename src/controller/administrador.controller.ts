import type { Request, Response } from 'express';
import { AdministradorService } from '../services/administrador.service.js';
import type { CreateAdministradorDto } from '../dtos/administrador/create-administrador.dto.js';

export class AdministradorController {
    private service = new AdministradorService();

    async criar(req: Request, res: Response) {
        try {
            const adminData: CreateAdministradorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const novoAdmin = await this.service.criar(adminData, utilizadorIdLogado);
            return res.status(201).json({ mensagem: 'Administrador criado com sucesso', dados: novoAdmin });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao criar administrador' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const administradores = await this.service.listar();
            return res.status(200).json({ dados: administradores, total: administradores.length });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao listar administradores' });
        }
    }

    async obter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const administrador = await this.service.obter(Number(id));
            return res.status(200).json({ dados: administrador });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter administrador' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const adminData: CreateAdministradorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const adminAtualizado = await this.service.atualizar(Number(id), adminData, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Administrador atualizado com sucesso', dados: adminAtualizado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao atualizar administrador' });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            await this.service.apagar(Number(id), utilizadorIdLogado);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao apagar administrador' });
        }
    }

    async gestarPerfisPermissoes(req: Request, res: Response) {
        try {
            const { utilizadorId } = req.params;
            const { perfil, permissoes } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const resultado = await this.service.gestarPerfisPermissoes(Number(utilizadorId), perfil, permissoes, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Perfis e permissões atualizados com sucesso', dados: resultado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao gerir perfis e permissões' });
        }
    }

    async configurarLimiaresCarat(req: Request, res: Response) {
        try {
            const { limiarBaixo, limiarIntermedio, limiarAlto } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const config = await this.service.configurarLimiaresCarat(limiarBaixo, limiarIntermedio, limiarAlto, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Limiares CARAT configurados com sucesso', dados: config });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao configurar limiares CARAT' });
        }
    }

    async obterConfigLimiaresCarat(_req: Request, res: Response) {
        try {
            const config = await this.service.obterConfigLimiaresCarat();
            return res.status(200).json({ dados: config });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao obter configurações CARAT' });
        }
    }

    async gestarDados(req: Request, res: Response) {
        try {
            const { tipoOperacao, dados } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;
            const resultado = await this.service.gestarDados(tipoOperacao, dados, utilizadorIdLogado);
            return res.status(200).json({ mensagem: 'Dados geridos com sucesso', dados: resultado });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao gerir dados do sistema' });
        }
    }

    async validarAdministrador(req: Request, res: Response) {
        try {
            const { utilizadorId } = req.params;
            const isAdmin = await this.service.validarAdministrador(Number(utilizadorId));
            return res.status(200).json({ isAdministrador: isAdmin });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message || 'Erro ao validar administrador' });
        }
    }
}
