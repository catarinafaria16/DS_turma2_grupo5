import { AppDataSource } from '../database/data-source.js';
import { Administrador } from '../models/administrador.entity.js';
import type { CreateAdministradorDto } from '../dtos/administrador/create-administrador.dto.js';
import type { AdministradorResponseDto } from '../dtos/administrador/administrador-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AdministradorService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Administrador); }

    async criar(adminData: CreateAdministradorDto, utilizadorIdLogado: number): Promise<AdministradorResponseDto> {
        try {
            const admin = this.repo.create(adminData);
            const saved = await this.repo.save(admin);

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'administrador',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            );

            return saved;
        } catch (error) {
            console.error('Erro ao criar administrador:', error);
            throw error;
        }
    }

    async obter(administradorId: number): Promise<AdministradorResponseDto> {
        try {
            if (administradorId <= 0) throw new Error('ID de administrador inválido');
            const admin = await this.repo.findOne({ where: { id: administradorId } });
            if (!admin) throw new Error('Administrador não encontrado');
            return admin;
        } catch (error) {
            console.error('Erro ao obter administrador:', error);
            throw error;
        }
    }

    async listar(): Promise<AdministradorResponseDto[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            console.error('Erro ao listar administradores:', error);
            throw error;
        }
    }

    async atualizar(administradorId: number, adminData: CreateAdministradorDto, utilizadorIdLogado: number): Promise<AdministradorResponseDto> {
        try {
            const anterior = await this.obter(administradorId);
            const atualizado = await this.repo.save({ ...anterior, ...adminData, id: administradorId });

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'administrador',
                administradorId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            );

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar administrador:', error);
            throw error;
        }
    }

    async apagar(administradorId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(administradorId);
            await this.repo.softDelete(administradorId);

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'administrador',
                administradorId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar administrador:', error);
            throw error;
        }
    }

    async gestarPerfisPermissoes(utilizadorId: number, perfil: string, permissoes: string[], utilizadorIdLogado: number): Promise<any> {
        try {
            const dadosNovos = { perfil, permissoes };

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'utilizador_permissoes',
                utilizadorId,
                OperacaoAuditoria.ALTERACAO,
                null,
                JSON.stringify(dadosNovos)
            );

            return { utilizadorId, perfil, permissoes };
        } catch (error) {
            console.error('Erro ao gerir perfis e permissões:', error);
            throw error;
        }
    }

    async validarAdministrador(utilizadorId: number): Promise<boolean> {
        try {
            const admin = await this.repo.findOne({ where: { utilizador_id: utilizadorId } });
            return admin !== null;
        } catch (error) {
            console.error('Erro ao validar administrador:', error);
            return false;
        }
    }
}
