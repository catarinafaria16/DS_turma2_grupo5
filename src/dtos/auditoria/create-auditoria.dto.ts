/*
 * CreateAuditoriaDto — Dados para criar um registo de auditoria
 *
 * Este DTO é usado internamente pelo AuditoriaService — não é enviado
 * diretamente pelos clientes da API. É preenchido automaticamente
 * sempre que se cria, altera ou elimina um registo importante.
 */
import { OperacaoAuditoria } from '../../enums/OperacaoAuditoria.enum.js';

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
    valor_anterior: JsonObject | string;
    valor_novo: JsonObject | string;
}
