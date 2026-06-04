/*
 * ============================================================
 * validateEnum.ts — Função utilitária de validação de enums
 * ============================================================
 *
 * Esta função é usada pelos services para verificar se um valor
 * recebido da API é um valor válido de um enum TypeScript.
 *
 * Por exemplo, antes de guardar uma prescrição, o service valida
 * que o tipo enviado ("MEDICACAO" ou "EXAME") é um valor válido
 * do enum TipoPrescricao.
 *
 * Se o valor não for válido, lança um erro descritivo que diz
 * exatamente qual o campo inválido e quais os valores aceites.
 * Esse erro é depois convertido numa resposta HTTP 400 (Bad Request).
 */

/*
 * validarEnum — Verifica se um valor é válido para um enum
 *
 * Parâmetros:
 *   - enumObj: o enum TypeScript a validar (ex: TipoPrescricao)
 *   - valor: o valor a verificar (ex: "MEDICACAO")
 *   - campo: nome do campo para incluir na mensagem de erro (ex: "tipo")
 *
 * Se o valor não estiver no enum, lança um Error com mensagem descritiva.
 * Não devolve nada se o valor for válido.
 */
export function validarEnum<T extends Record<string, string>>(
    enumObj: T,
    valor: string,
    campo: string
): void {
    // Object.values(enumObj) obtém todos os valores possíveis do enum
    if (!Object.values(enumObj).includes(valor as T[keyof T])) {
        // Lança um erro descritivo que explica o problema e lista as opções válidas
        throw new Error(
            `Valor inválido para '${campo}': '${valor}'. Valores aceites: ${Object.values(enumObj).join(', ')}`
        );
    }
}
