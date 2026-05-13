import { CategoriaRegraAlerta } from '../../enums/CategoriaRegraAlerta.enum';
import { PrioridadeRegraAlerta } from '../../enums/PrioridadeRegraAlerta.enum';

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