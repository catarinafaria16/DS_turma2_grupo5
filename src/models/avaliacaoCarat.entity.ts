type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export class AvaliacaoCarat {
    id: number;
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

    constructor(
        id: number,
        data_criacao: Date,
        q1: string,
        q2: string,
        q3: string,
        q4: string,
        q5: string,
        q6: string,
        q7: string,
        q8: string,
        q9: string,
        q10: string,
        r1: JsonObject,
        r2: JsonObject,
        r3: JsonObject,
        r4: JsonObject,
        r5: JsonObject,
        r6: JsonObject,
        r7: JsonObject,
        r8: JsonObject,
        r9: JsonObject,
        r10: JsonObject,
        versao: number
    ) {
        this.id = id;
        this.data_criacao = data_criacao;
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
        this.q4 = q4;
        this.q5 = q5;
        this.q6 = q6;
        this.q7 = q7;
        this.q8 = q8;
        this.q9 = q9;
        this.q10 = q10;
        this.r1 = r1;
        this.r2 = r2;
        this.r3 = r3;
        this.r4 = r4;
        this.r5 = r5;
        this.r6 = r6;
        this.r7 = r7;
        this.r8 = r8;
        this.r9 = r9;
        this.r10 = r10;
        this.versao = versao;
    }
}
