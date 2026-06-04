/*
 * AuditoriaResponseDto — Dados devolvidos pela API de auditoria
 *
 * Este DTO define a estrutura dos dados de auditoria que a API devolve.
 * Inclui tudo o que é necessário para perceber o que aconteceu:
 * quem fez, em que tabela, que operação, e os dados antes e depois.
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

export interface AuditoriaResponseDto {
    log_id: number;
    utilizador_id: number;
    tabela: string;
    tabela_id: number;
    operacao: OperacaoAuditoria;
    valor_anterior: JsonObject | string | null;
    valor_novo: JsonObject | string | null;
}
