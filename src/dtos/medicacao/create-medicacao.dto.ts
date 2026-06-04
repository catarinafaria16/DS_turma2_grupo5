/*
 * CreateMedicacaoDto — Dados necessários para adicionar um medicamento a uma prescrição
 *
 * A dose deve estar no formato "valor unidade" (ex: "500 mg", "1 g", "200 mcg").
 * O sistema valida clinicamente se a dose está dentro de intervalos razoáveis
 * para medicamentos conhecidos (ver catálogo em medicacao.service.ts).
 *
 * Ao criar um medicamento, é automaticamente adicionado à medicação habitual do utente.
 */
export interface CreateMedicacaoDto {
    prescricao_id: number;   // ID da prescrição a que este medicamento pertence
    nome: string;            // Nome do medicamento (ex: "Cetirizina 10mg", "Budesonida 200mcg")
    dose: string;            // Dose por administração (ex: "10 mg", "200 mcg", "1 comprimido")
    duracao: string;         // Duração do tratamento (ex: "30 dias", "3 meses")
    periodicidade: string;   // Frequência de administração (ex: "1x por dia", "de 8 em 8 horas")
}