import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto';
import type { MedicoResponseDto } from '../dtos/medico/medico-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class MedicoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        medicoData: CreateMedicoDto,
        utilizadorIdLogado: number
    ): Promise<MedicoResponseDto> {
        try {
            if (medicoData.utilizador_id <= 0) {
                throw new Error('ID do utilizador deve ser válido');
            }
            if (!medicoData.crm || medicoData.crm.trim().length === 0) {
                throw new Error('CRM é obrigatório');
            }
            if (!medicoData.especialidade || medicoData.especialidade.trim().length === 0) {
                throw new Error('Especialidade é obrigatória');
            }

            const novoMedico: MedicoResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...medicoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                novoMedico.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoMedico)
            );

            return novoMedico;
        } catch (error) {
            console.error('Erro ao criar médico:', error);
            throw error;
        }
    }

    async obter(medicoId: number): Promise<MedicoResponseDto> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID de médico inválido');
            }

            const medico: MedicoResponseDto = {
                id: medicoId,
                utilizador_id: 0,
                crm: '',
                especialidade: '',
                telefone: '',
                email: ''
            };

            return medico;
        } catch (error) {
            console.error('Erro ao obter médico:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicoResponseDto[]> {
        try {
            // TODO: Buscar todos os médicos na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar médicos:', error);
            throw error;
        }
    }

    async atualizar(
        medicoId: number,
        medicoData: CreateMedicoDto,
        utilizadorIdLogado: number
    ): Promise<MedicoResponseDto> {
        try {
            const medicoAnterior = await this.obter(medicoId);

            const medicoAtualizado: MedicoResponseDto = {
                ...medicoAnterior,
                ...medicoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                medicoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(medicoAnterior),
                JSON.stringify(medicoAtualizado)
            );

            return medicoAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar médico:', error);
            throw error;
        }
    }

    async apagar(medicoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const medicoAnterior = await this.obter(medicoId);

            // TODO: Apagar da base de dados ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                medicoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(medicoAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar médico:', error);
            throw error;
        }
    }
}
