
export interface MedicacaoResponseDto {
    id: number;
    prescricao_id: number;
    nome: string;
    dose: string;
    duracao: string;
    periodicidade: string;
    validade: Date;
}