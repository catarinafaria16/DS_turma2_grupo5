export interface MedicoResponseDto {
    id: number;
    utilizador_id: number;
    especialidade: string;
    contacto: string;
    deleted_at?: Date;
}
