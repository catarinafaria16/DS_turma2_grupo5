import { CategoriaRegraAlerta } from '../../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum.js';

export interface RegraAlertaResponseDto {
    id: number;
    medico_id: number;
    administrador_id: number;
    categoria: CategoriaRegraAlerta;
    limiar_score: number;
    valor_deteoracao: number;
    prioridade: PrioridadeRegraAlerta;
    data_criacao: Date;
}