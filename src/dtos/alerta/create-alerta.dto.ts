import { EstadoAlerta } from '../../enums/EstadoAlerta.enum.js';
import { TipoAlerta } from '../../enums/TipoAlerta.enum.js';
import type { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface CreateAlertaDto {
    utente_id: number;
    medico_id: number;
    regra_id?: number;
    tipo: TipoAlerta;
    estado: EstadoAlerta;
    prioridade: PrioridadeRegraAlerta;
    notas?: string;
}
