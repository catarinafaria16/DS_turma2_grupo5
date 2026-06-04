/*
 * PrescricaoResponseDto — Dados de uma prescrição devolvidos pela API
 *
 * Estrutura das prescrições nas respostas GET /api/prescricoes.
 * Os medicamentos/exames associados são obtidos em endpoints separados.
 */
import { EstadoPrescricao } from '../../enums/EstadoPrescricao.enum.js';
import { TipoPrescricao } from '../../enums/TipoPrescricao.enum.js';

export interface PrescricaoResponseDto {
    id: number;                   // ID único da prescrição
    medico_id: number;            // ID do médico que emitiu
    utente_id: number;            // ID do utente destinatário
    tipo: TipoPrescricao;        // MEDICACAO ou EXAME
    data_emissao: Date;          // Data de emissão
    data_validade: Date;         // Data de validade
    estado: EstadoPrescricao;   // Estado atual: ATIVA, DISPENSADA ou CANCELADA
}