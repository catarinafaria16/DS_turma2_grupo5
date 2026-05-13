import { Request, Response } from 'express';
import { AdministradorService } from '../services/administrador.service';
import type { CreateAdministradorDto } from '../dtos/administrador/create-administrador.dto';

export class AdministradorController {
    private service: AdministradorService;

    constructor() {
        this.service = new AdministradorService();
    }

    /* Criar novo administrador */
    async criar(req: Request, res: Response): Promise<void> {
        try {
            const adminData: CreateAdministradorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado; /* Assumindo que vem do middleware de autenticação */

            const novoAdmin = await this.service.criar(adminData, utilizadorIdLogado);
            res.status(201).json({
                mensagem: 'Administrador criado com sucesso',
                dados: novoAdmin
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao criar administrador'
            });
        }
    }

    /* Listar todos os administradores */
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const administradores = await this.service.listar();
            res.status(200).json({
                dados: administradores,
                total: administradores.length
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao listar administradores'
            });
        }
    }

    /* Obter administrador por ID  */
    async obter(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const administrador = await this.service.obter(Number(id));
            res.status(200).json({
                dados: administrador
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter administrador'
            });
        }
    }

    /* Atualizar administrador */
    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const adminData: CreateAdministradorDto = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const adminAtualizado = await this.service.atualizar(Number(id), adminData, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Administrador atualizado com sucesso',
                dados: adminAtualizado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao atualizar administrador'
            });
        }
    }

    /* Apagar administrador*/
    async apagar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            await this.service.apagar(Number(id), utilizadorIdLogado);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao apagar administrador'
            });
        }
    }

    /* Gerir perfis e permissões de um utilizador */
    async gestarPerfisPermissoes(req: Request, res: Response): Promise<void> {
        try {
            const { utilizadorId } = req.params;
            const { perfil, permissoes } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const resultado = await this.service.gestarPerfisPermissoes(
                Number(utilizadorId),
                perfil,
                permissoes,
                utilizadorIdLogado
            );
            res.status(200).json({
                mensagem: 'Perfis e permissões atualizados com sucesso',
                dados: resultado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao gerir perfis e permissões'
            });
        }
    }

    /* Configurar limiares CARAT */
    async configurarLimiaresCarat(req: Request, res: Response): Promise<void> {
        try {
            const { limiarBaixo, limiarIntermedio, limiarAlto } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const config = await this.service.configurarLimiaresCarat(
                limiarBaixo,
                limiarIntermedio,
                limiarAlto,
                utilizadorIdLogado
            );
            res.status(200).json({
                mensagem: 'Limiares CARAT configurados com sucesso',
                dados: config
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao configurar limiares CARAT'
            });
        }
    }

    /* Obter configurações dos limiares CARAT */
    async obterConfigLimiaresCarat(req: Request, res: Response): Promise<void> {
        try {
            const config = await this.service.obterConfigLimiaresCarat();
            res.status(200).json({
                dados: config
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao obter configurações CARAT'
            });
        }
    }

    /* Gerir dados do sistema */
    async gestarDados(req: Request, res: Response): Promise<void> {
        try {
            const { tipoOperacao, dados } = req.body;
            const utilizadorIdLogado = req.body.utilizadorIdLogado;

            const resultado = await this.service.gestarDados(tipoOperacao, dados, utilizadorIdLogado);
            res.status(200).json({
                mensagem: 'Dados geridos com sucesso',
                dados: resultado
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao gerir dados do sistema'
            });
        }
    }

    /* Validar se o utilizador é um administrador */
    async validarAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { utilizadorId } = req.params;
            const isAdmin = await this.service.validarAdministrador(Number(utilizadorId));
            res.status(200).json({
                isAdministrador: isAdmin
            });
        } catch (error: any) {
            res.status(400).json({
                erro: error.message || 'Erro ao validar administrador'
            });
        }
    }
}