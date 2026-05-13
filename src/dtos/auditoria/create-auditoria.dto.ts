import { OperacaoAuditoria } from '../../enums/OperacaoAuditoria.enum';

type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export interface CreateAuditoriaDto {
    utilizador_id: number;
    tabela: string;
    tabela_id: number;
    operacao: OperacaoAuditoria;
    valor_antigo: JsonObject | string;
    valor_novo: JsonObject | string;
}