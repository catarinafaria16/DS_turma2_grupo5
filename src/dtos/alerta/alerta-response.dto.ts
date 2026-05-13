import { EstadoAlerta } from '../../enums/EstadoAlerta.enum';
import { TipoAlerta } from '../../enums/IntensidadeCriseAlergia.enum';

export interface AlertaResponseDto {
    id: number;
    utente_id: number;
    medico_id: number;
    regra_id: number;
    tipo: TipoAlerta;
    estado: EstadoAlerta;
    data_criacao: Date;
    data_atualizacao_estado: Date;
}