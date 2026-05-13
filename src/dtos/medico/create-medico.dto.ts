export interface CreateMedicoDto {
    utilizador_id: number;
    crm: string;
    especialidade: string;
    telefone?: string;
    email?: string;
}