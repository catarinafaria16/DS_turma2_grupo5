
type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export interface CreateAvaliacaoCaratDto {
    data_criacao: Date;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
    q7: string;
    q8: string;
    q9: string;
    q10: string;
    r1: JsonObject;
    r2: JsonObject;
    r3: JsonObject;
    r4: JsonObject;
    r5: JsonObject;
    r6: JsonObject;
    r7: JsonObject;
    r8: JsonObject;
    r9: JsonObject;
    r10: JsonObject;
    versao: number;
}