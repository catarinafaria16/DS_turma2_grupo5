import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto';
import type { MedicacaoResponseDto } from '../dtos/medicacao/medicacao-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

export class MedicacaoService {
    private auditoriaService: any; // TODO: Implementar AuditoriaService

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        medicacaoData: CreateMedicacaoDto,
        utilizadorIdLogado: number
    ): Promise<MedicacaoResponseDto> {
        try {
            if (medicacaoData.prescricao_id <= 0) {
                throw new Error('ID de prescrição deve ser válido');
            }
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicação é obrigatório');
            }

            const novaMedicacao: MedicacaoResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...medicacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao',
                novaMedicacao.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaMedicacao)
            );

            return novaMedicacao;
        } catch (error) {
            console.error('Erro ao criar medicação:', error);
            throw error;
        }
    }

    async obter(medicacaoId: number): Promise<MedicacaoResponseDto> {
        try {
            if (medicacaoId <= 0) {
                throw new Error('ID de medicação inválido');
            }

            const medicacao: MedicacaoResponseDto = {
                id: medicacaoId,
                prescricao_id: 0,
                nome: '',
                dose: '',
                duracao: '',
                periodicidade: '',
                validade: new Date()
            };

            return medicacao;
        } catch (error) {
            console.error('Erro ao obter medicação:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicacaoResponseDto[]> {
        try {
            // TODO: Buscar todas as medicações na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar medicações:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number): Promise<MedicacaoResponseDto[]> {
        try {
            if (prescricaoId <= 0) {
                throw new Error('ID de prescrição inválido');
            }

            // TODO: Buscar medicações por prescrição na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar medicações por prescrição:', error);
            throw error;
        }
    }

    async atualizar(
        medicacaoId: number,
        medicacaoData: CreateMedicacaoDto,
        utilizadorIdLogado: number
    ): Promise<MedicacaoResponseDto> {
        try {
            const medicacaoAnterior = await this.obter(medicacaoId);

            const medicacaoAtualizada: MedicacaoResponseDto = {
                ...medicacaoAnterior,
                ...medicacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao',
                medicacaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(medicacaoAnterior),
                JSON.stringify(medicacaoAtualizada)
            );

            return medicacaoAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar medicação:', error);
            throw error;
        }
    }

    async apagar(medicacaoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const medicacaoAnterior = await this.obter(medicacaoId);

            // TODO: Apagar da base de dados ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao',
                medicacaoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(medicacaoAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar medicação:', error);
            throw error;
        }
    }
}
