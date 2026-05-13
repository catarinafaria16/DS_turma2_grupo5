import { EstadoPrescricao } from '../../enums/EstadoPrescricao.enum';
import { TipoPrescricao } from '../../enums/TipoPrescricao.enum';

export interface CreatePrescricaoDto {
    medico_id: number;
    utente_id: number;
    tipo: TipoPrescricao;
    data_emissao: Date;
    data_validade: Date;
    estado: EstadoPrescricao;
    assinatura: string;
}