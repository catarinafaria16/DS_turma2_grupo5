/*
 * CreatePrescricaoDto — Dados necessários para criar uma nova prescrição médica
 *
 * Define os campos que devem ser enviados no corpo do pedido
 * POST /api/prescricoes para criar uma prescrição.
 *
 * Nota: a data_validade deve ser posterior à data_emissao (validado no service).
 * Os medicamentos/exames associados são criados separadamente após a prescrição.
 */
import { EstadoPrescricao } from '../../enums/EstadoPrescricao.enum.js';
import { TipoPrescricao } from '../../enums/TipoPrescricao.enum.js';

export interface CreatePrescricaoDto {
    medico_id: number;          // ID do médico que emite a prescrição
    utente_id: number;          // ID do utente para quem é emitida
    tipo: TipoPrescricao;       // MEDICACAO ou EXAME
    data_emissao: Date;         // Data em que a prescrição é emitida (normalmente a data atual)
    data_validade: Date;        // Data até à qual a prescrição é válida (deve ser posterior à emissão)
    estado: EstadoPrescricao;   // Estado inicial: normalmente ATIVA
}