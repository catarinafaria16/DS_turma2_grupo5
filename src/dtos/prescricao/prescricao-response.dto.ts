import { EstadoPrescricao } from '../../enums/EstadoPrescricao.enum.js';
import { TipoPrescricao } from '../../enums/TipoPrescricao.enum.js';

export interface PrescricaoResponseDto {
    id: number;
    medico_id: number;
    utente_id: number;
    tipo: TipoPrescricao;
    data_emissao: Date;
    data_validade: Date;
    estado: EstadoPrescricao;
}