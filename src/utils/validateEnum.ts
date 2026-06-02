export function validarEnum<T extends Record<string, string>>(
    enumObj: T,
    valor: string,
    campo: string
): void {
    if (!Object.values(enumObj).includes(valor as T[keyof T])) {
        throw new Error(
            `Valor inválido para '${campo}': '${valor}'. Valores aceites: ${Object.values(enumObj).join(', ')}`
        );
    }
}
