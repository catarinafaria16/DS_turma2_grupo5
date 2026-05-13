import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export class Auditoria {
    log_id: number;
    utilizador_id: number;
    tabela: string;
    tabela_id: number;
    operacao: OperacaoAuditoria;
    valor_anterior: JsonObject | string | null;
    valor_novo: JsonObject | string | null;
    timestamp: Date;

    constructor(
        log_id: number,
        utilizador_id: number,
        tabela: string,
        tabela_id: number,
        operacao: OperacaoAuditoria,
        valor_anterior: JsonObject | string | null,
        valor_novo: JsonObject | string | null,
        timestamp: Date
    ) {
        this.log_id = log_id;
        this.utilizador_id = utilizador_id;
        this.tabela = tabela;
        this.tabela_id = tabela_id;
        this.operacao = operacao;
        this.valor_anterior = valor_anterior;
        this.valor_novo = valor_novo;
        this.timestamp = timestamp;
    }
}
