export interface MedicoResponseDto {
    id: number;
    utilizador_id: number;
    crm: string;
    especialidade: string;
    telefone?: string;
    email?: string;
}
