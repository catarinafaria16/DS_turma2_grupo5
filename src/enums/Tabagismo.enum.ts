/*
 * Tabagismo — Situação tabágica do utente
 *
 * O tabagismo é um dos fatores de risco mais importantes para doenças
 * respiratórias como a asma e a DPOC. É registado na anamnese do utente.
 *
 * A classificação é granular para permitir avaliação clínica mais precisa:
 *   - Quanto mais cigarros por dia, maior o risco e a gravidade da doença
 *   - A exposição passiva (fumador passivo) também tem impacto clínico
 */
export enum Tabagismo {
    NAO_FUMADOR = 'NAO FUMADOR',                         // Nunca fumou
    EX_FUMADOR = 'EX-FUMADOR',                           // Já fumou mas deixou de fumar
    EXPOSICAO_PASSIVA = 'EXPOSICAO PASSIVA',             // Não fuma mas está exposto ao fumo de outros
    OCASIONAL = 'OCASIONAL',                             // Fuma esporadicamente (menos de 1 cigarro/dia)
    MENOS_10_CIGARROS_DIA = 'MENOS DE 10 CIGARROS/DIA', // Fumador ligeiro
    _10_A_20_CIGARROS_DIA = '10 A 20 CIGARROS/DIA',     // Fumador moderado
    MAIS_20_CIGARROS_DIA = 'MAIS DE 20 CIGARROS/DIA'    // Fumador pesado
}
